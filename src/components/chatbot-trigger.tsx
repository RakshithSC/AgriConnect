"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatbotTrigger() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 focus-visible:ring-ring"
            aria-label="Open Chat"
          >
            <MessageSquare className="h-7 w-7" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat with Support</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
