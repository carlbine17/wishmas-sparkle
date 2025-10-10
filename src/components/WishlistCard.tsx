import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Gift } from "lucide-react";
import { useState } from "react";

interface WishlistCardProps {
  name: string;
  wishlist1: string;
  wishlist2: string;
  wishlist3: string;
  nickname: string;
  aboutMe: string;
}

const WishlistCard = ({ name, wishlist1, wishlist2, wishlist3, nickname, aboutMe }: WishlistCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-card border-2 animate-fade-in overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-full bg-gradient-christmas dark:bg-gradient-coffee">
              <Gift className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-serif font-bold text-card-foreground">{name}</h3>
          </div>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-accent hover:opacity-80 transition-opacity">
            Wishlists
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-3 border-t border-border pt-4">
            {wishlist1 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Wishlist 1</p>
                <p className="text-card-foreground">{wishlist1}</p>
              </div>
            )}
            {wishlist2 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Wishlist 2</p>
                <p className="text-card-foreground">{wishlist2}</p>
              </div>
            )}
            {wishlist3 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Wishlist 3</p>
                <p className="text-card-foreground">{wishlist3}</p>
              </div>
            )}
            {nickname && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Nickname</p>
                <p className="text-card-foreground">{nickname}</p>
              </div>
            )}
            {aboutMe && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">About Me</p>
                <p className="text-card-foreground">{aboutMe}</p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default WishlistCard;
