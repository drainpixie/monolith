{
  lib,
  stdenv,
  pnpm,
  nodejs,
  typescript,
  ...
} @ args:
stdenv.mkDerivation (final: let
  manifest = lib.importJSON ./package.json;
  env = builtins.removeAttrs args [
    "lib"
    "stdenv"
    "pnpm"
    "nodejs"
    "typescript"
  ];
in {
  inherit (manifest) version;
  src = ./.;
  pname = manifest.name;

  # WARN: Only for semver, not worth the hassle
  dontCheckForBrokenSymlinks = true;

  pnpmDeps = pnpm.fetchDeps {
    inherit (final) pname src;

    hash = "sha256-oGZpuqxXylGHqr6+UC8kynjbUyUrmnlgpvqHOHsUFec=";
    fetcherVersion = 2;
  };

  nativeBuildInputs = [nodejs typescript pnpm.configHook];

  buildPhase = ''
    runHook preBuild

    echo "${lib.concatStringsSep "\n" (lib.mapAttrsToList (k: v: "${k}=${v}") env)}" > .env
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
