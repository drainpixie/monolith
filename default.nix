{
  lib,
  pnpm,
  nodejs,
  stdenv,
  typescript,
  ...
} @ args: let
  inherit (lib) importJSON concatStringsSep mapAttrsToList;
  inherit (manifest) name version;

  manifest = importJSON ./package.json;
  env = builtins.removeAttrs args ["lib" "pnpm" "nodejs" "stdenv" "typescript"];
in
  stdenv.mkDerivation (final: {
    inherit version;

    src = ./.;
    pname = name;

    dontCheckForBrokenSymlinks = true;
    nativeBuildInputs = [nodejs typescript pnpm.configHook];

    pnpmDeps = pnpm.fetchDeps {
      inherit (final) pname src;

      hash = "sha256-oGZpuqxXylGHqr6+UC8kynjbUyUrmnlgpvqHOHsUFec=";
      fetcherVersion = 2;
    };

    buildPhase = ''
      runHook preBuild

      echo "${concatStringsSep "\n" (mapAttrsToList (k: v: "${k}=${v}") env)}" > .env
      pnpm run build

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      cp -r .next/standalone $out
      cp -r .next/static $out/.next
      cp -r public $out/public

      runHook postInstall
    '';
  })
