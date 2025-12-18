import Age from "@/components/age";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Some more info on me.</p>
      </div>

      <div>
        <h2>Fun Facts</h2>
        <ul>
          <li>I speak multiple languages</li>
          <li>I play Pokémon competitively</li>
          <li>
            I&apos;m <Age birthday={new Date(2006, 5, 13)} /> years old
          </li>
          <li>
            I enjoy{" "}
            <a
              href="http://last.fm/user/pinkcig_"
              target="_blank"
              rel="noopener noreferrer"
            >
              all
            </a>{" "}
            kinds of music genres
          </li>
          <li>I can type an average of 150 words per minute</li>
          <li>
            My favourite colour is{" "}
            <span className="badge bg-favourite">
              oklch(0.8398 0.0561 5.82)
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2>Hardware</h2>
        <ul>
          <li>
            iPhone 13 <span className="badge bg-purple-200">main</span>
          </li>
          <li>
            Sony WF-C500 <span className="badge bg-red-200">gym</span>
          </li>
          <li>
            Latitude 5490 <span className="badge bg-yellow-200">main</span>
          </li>
          <li>
            Moondrop CHU II <span className="badge bg-red-200">main</span>
          </li>
          <li>
            PlayStation 4 Slim <span className="badge bg-green-200">main</span>
          </li>
          <li>
            2DS Red Groudon <span className="badge bg-green-200">main</span>
          </li>
          <li>
            DSi XL Burgundy <span className="badge bg-green-100">extra</span>
          </li>
          <li>
            DSi Red <span className="badge bg-green-100">extra</span>
          </li>
        </ul>
      </div>

      <div>
        <h2>Software</h2>
        <ul>
          <li>
            <a href="https://www.zsh.org/" target="_blank" rel="noopener">
              Zsh
            </a>
          </li>
          <li>
            <a href="https://nixos.org/" target="_blank" rel="noopener">
              NixOS
            </a>
          </li>
          <li>
            <a href="https://neovim.io/" target="_blank" rel="noopener">
              Neovim
            </a>{" "}
          </li>
          <li>
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener"
            >
              Chrome
            </a>
          </li>
          <li>
            <a
              href="https://github.com/alacritty/alacritty"
              target="_blank"
              rel="noopener"
            >
              Alacritty
            </a>
          </li>
          <li>
            <a
              href="https://github.com/nix-community/nix-direnv"
              target="_blank"
              rel="noopener"
            >
              Nix Direnv
            </a>
          </li>
          <li>
            <a
              href="https://github.com/nix-community/home-manager"
              target="_blank"
              rel="noopener"
            >
              Home Manager
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
