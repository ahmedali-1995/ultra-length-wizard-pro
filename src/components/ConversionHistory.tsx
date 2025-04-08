
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ConversionResult } from '@/types';
import { formatValue } from '@/utils/conversionUtils';
import { X, ClipboardCopy, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface ConversionHistoryProps {
  history: ConversionResult[];
  onClear: () => void;
  onCopy: (result: ConversionResult) => void;
  onRemoveItem: (id: string) => void;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ 
  history, 
  onClear, 
  onCopy,
  onRemoveItem 
}) => {
  if (history.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <Clock className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
        <p>Your conversion history will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Recent Conversions</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>
      
      <Separator className="my-2" />
      
      <ScrollArea className="h-[250px] w-full pr-4">
        <div>
          {history.map((result) => (
            <div key={result.id} className="history-item group">
              <div className="flex-1">
                <div className="flex items-center text-sm">
                  <span className="font-medium">{formatValue(result.fromValue)}</span>
                  <span className="mx-1 text-muted-foreground">{result.fromUnit}</span>
                  <span className="mx-1">→</span>
                  <span className="font-medium">{formatValue(result.toValue)}</span>
                  <span className="ml-1 text-muted-foreground">{result.toUnit}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onCopy(result)}
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveItem(result.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversionHistory;
