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
    <Card
      className={`bg-card/90 backdrop-blur-sm border-2 overflow-hidden transition-transform transition-shadow duration-500 ease-in-out relative group
        ${isOpen ? 'scale-[1.015] shadow-glow-gold dark:shadow-glow-cinnamon' : 'shadow-festive dark:shadow-warm hover:shadow-glow-gold dark:hover:shadow-glow-cinnamon'}`}
    >


      {/* Gift ribbon effect */}
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-full bg-gradient-christmas dark:bg-gradient-coffee transition-opacity duration-300 ${isOpen ? 'opacity-10' : 'opacity-20'} ${!isOpen ? 'group-hover:opacity-30' : ''}`}></div>

      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-christmas dark:bg-gradient-coffee transition-opacity duration-300 ${isOpen ? 'opacity-20' : 'opacity-40'}`}></div>


      
      {/* Gift bow */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-christmas dark:bg-gradient-coffee rounded-full shadow-md flex items-center justify-center">
            <Gift className="h-4 w-4 text-white" />
          </div>
          {/* Bow loops */}
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-christmas dark:bg-gradient-coffee rounded-full opacity-80"></div>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-christmas dark:bg-gradient-coffee rounded-full opacity-80"></div>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 pt-6 flex items-center justify-between hover:bg-muted/50 transition-all duration-300 relative">
          <div className="flex items-center gap-3 flex-1">
            <h3 className="text-lg font-serif font-bold text-card-foreground bg-gradient-christmas dark:bg-gradient-coffee bg-clip-text text-transparent">{name}</h3>
          </div>
          <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-christmas dark:bg-gradient-coffee text-white font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg">
            <Gift className="h-4 w-4" />
            Wishlist
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden transition-all">
          <div className="px-4 pb-4 space-y-3 border-t border-border pt-4 animate-fade-in">
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
