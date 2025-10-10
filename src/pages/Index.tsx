import { ThemeToggle } from "@/components/ThemeToggle";
import Snowfall from "@/components/Snowfall";
import WishlistCard from "@/components/WishlistCard";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data, loading, error } = useGoogleSheets(
    "https://docs.google.com/spreadsheets/d/1PspkZuZNtSlqHJItaDvdhSpAt-IPK5iuGF_vyAaswFY/edit?fbclid=IwY2xjawNViIVleHRuA2FlbQIxMABicmlkETFaS0xCdUdMR24wNHZkZUowAR4lCwnfK6ZB9R1iAVQga1ZyUpsj4rMReMk6uzRP67vzhL4r-X-DyAguqDY1Fw_aem_rdjeaMNe13-wnOi0kzsW3A&gid=1684228881#gid=1684228881"
  );

  return (
    <div className="min-h-screen bg-gradient-snow dark:bg-gradient-cozy transition-colors duration-500">
      <Snowfall />
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-primary dark:text-secondary">
            Christmas Gift Exchange
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <span className="dark:hidden">🎄 Browse everyone's wishlists and find the perfect gift! 🎁</span>
            <span className="hidden dark:inline">☕ Cozy up and find the perfect gift for everyone! 🎁</span>
          </p>
        </header>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary dark:text-accent mb-4" />
            <p className="text-muted-foreground">Loading wishlists...</p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6">
              <p className="text-destructive font-semibold mb-2">Error loading wishlists</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground mt-4">
                Please make sure the Google Sheet is publicly accessible
              </p>
            </div>
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No wishlists found</p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-2">
            {data.map((wishlist, index) => (
              <WishlistCard
                key={index}
                name={wishlist.name}
                wishlist1={wishlist.wishlist1}
                wishlist2={wishlist.wishlist2}
                wishlist3={wishlist.wishlist3}
                nickname={wishlist.nickname}
                aboutMe={wishlist.aboutMe}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="text-center py-8 text-muted-foreground">
        <p className="text-sm">
          Made with <span className="text-primary dark:text-accent">❤</span> for our Christmas gift exchange
        </p>
      </footer>
    </div>
  );
};

export default Index;
