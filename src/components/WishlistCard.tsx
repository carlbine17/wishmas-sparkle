import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";

interface WishlistCardProps {
  name: string;
  items: string[];
}

const WishlistCard = ({ name, items }: WishlistCardProps) => {
  return (
    <Card className="group p-6 bg-card hover:shadow-festive dark:hover:shadow-warm transition-all duration-300 hover:scale-105 border-2 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-full bg-gradient-christmas dark:bg-gradient-coffee group-hover:animate-float">
          <Gift className="h-6 w-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-card-foreground">{name}</h3>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Wishlist
        </p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-card-foreground"
            >
              <span className="text-primary dark:text-accent mt-1">✦</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default WishlistCard;
