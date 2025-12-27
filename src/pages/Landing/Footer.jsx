import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              VoxAI
            </h2>

            <p className="text-muted-foreground max-w-sm">
              Building the future of voice interaction. Open source,
              privacy-focused, and intelligent.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#tech-stack"
                  className="hover:text-primary transition-colors"
                >
                  Tech Stack
                </a>
              </li>
              <li>
                <a
                  href="https://www.souravpaitandy.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Visit Developer
                </a>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VoxAI All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Version 2.0</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a
              href="https://github.com/SouravPaitandy/voxai-virtual-ai-assistant"
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/PaitandySourav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/sourav-paitandy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
