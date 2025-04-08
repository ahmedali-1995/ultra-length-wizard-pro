
import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 md:py-8 mt-8 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="text-sm text-muted-foreground">
            <p>© 2025 UltraLength Wizard Pro. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm font-medium hover:underline underline-offset-4"
              aria-label="About"
            >
              About
            </a>
            <a 
              href="#" 
              className="text-sm font-medium hover:underline underline-offset-4"
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm font-medium hover:underline underline-offset-4"
              aria-label="Terms of Service"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
