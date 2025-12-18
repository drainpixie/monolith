{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";

    hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    hooks,
    nixpkgs,
  }: let
    supportedSystems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];

    forAllSystems = f:
      nixpkgs.lib.genAttrs supportedSystems (system:
        f {
          pkgs = nixpkgs.legacyPackages.${system};
          inherit system;
        });
  in {
    lib = forAllSystems ({pkgs, ...}: {withEnv = pkgs.callPackage ./default.nix;});
    packages = forAllSystems ({pkgs, ...}: {default = pkgs.callPackage ./default.nix {};});

    devShells = forAllSystems ({
      pkgs,
      system,
    }: let
      inherit (self.checks.${system}.pre-commit) shellHook enabledPackages;
    in {
      default = pkgs.mkShell {
        inherit shellHook;

        buildInputs =
          enabledPackages
          ++ builtins.attrValues {
            inherit (pkgs) nodejs pnpm;
          };
      };
    });

    checks = forAllSystems ({
      pkgs,
      system,
    }: {
      pre-commit = hooks.lib.${system}.run {
        src = ./.;
        package = pkgs.prek;

        hooks = {
          eslint = {
            enable = true;
            entry = "pnpm eslint";
            files = "\\.(ts|js|tsx|jsx)$";
          };

          prettier = {
            enable = true;
            excludes = ["flake.lock"];
          };

          statix.enable = true;
          convco.enable = true;
          alejandra.enable = true;
        };
      };
    });
  };
}
