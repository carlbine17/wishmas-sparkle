import { ThemeToggle } from "@/components/ThemeToggle";
import Snowfall from "@/components/Snowfall";
import WishlistCard from "@/components/WishlistCard";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { Loader2, MapPin, Calendar } from "lucide-react";
import casaNaviImage from "@/assets/casa-navi.jpg";

const Index = () => {
  const { data, loading, error } = useGoogleSheets(
    "https://docs.google.com/spreadsheets/d/1PspkZuZNtSlqHJItaDvdhSpAt-IPK5iuGF_vyAaswFY/edit?fbclid=IwY2xjawNViIVleHRuA2FlbQIxMABicmlkETFaS0xCdUdMR24wNHZkZUowAR4lCwnfK6ZB9R1iAVQga1ZyUpsj4rMReMk6uzRP67vzhL4r-X-DyAguqDY1Fw_aem_rdjeaMNe13-wnOi0kzsW3A&gid=1684228881#gid=1684228881"
  );

  return (
    <div className="min-h-screen bg-gradient-snow dark:bg-gradient-cozy transition-colors duration-500 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMCAwIi8+PC9nPjwvZz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMCAwIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      <Snowfall />
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-8 animate-fade-in backdrop-blur-sm bg-card/30 dark:bg-card/20 rounded-3xl p-8 border border-border/50 shadow-festive dark:shadow-warm mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-primary dark:text-secondary drop-shadow-sm">
            Christmas Gift Exchange
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <span className="dark:hidden">🎄 Browse everyone's wishlists and find the perfect gift! 🎁</span>
            <span className="hidden dark:inline">☕ Cozy up and find the perfect gift for everyone! 🎁</span>
          </p>
        </header>

       <section className="mb-12 animate-fade-in backdrop-blur-sm bg-card/40 dark:bg-card/30 rounded-3xl p-6 border border-border/50 shadow-festive dark:shadow-warm mx-auto max-w-4xl overflow-hidden">
  <div className="text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary dark:text-accent">
      🎁 Gifts Presentation Venue
    </h2>

    {/* Date block with icon */}
    <div className="flex flex-col items-center gap-2">
      <Calendar className="h-6 w-6 text-primary dark:text-accent" />
      <div>
        <p className="font-semibold text-card-foreground">December 29-30</p>
        <p className="text-sm text-muted-foreground">Join us for the gift exchange!</p>
      </div>
    </div>

    {/* Venue block with icon */}
    <div className="flex flex-col items-center gap-2">
      <MapPin className="h-6 w-6 text-primary dark:text-accent" />
      <div>
        <p className="font-serif text-2xl font-bold text-primary dark:text-accent">Casa Navi</p>
        <p className="text-sm text-muted-foreground">A beautiful venue for our celebration</p>
      </div>
    </div>

    {/* Image below */}
    <div>
      <img
          src={casaNaviImage}
          alt="Casa Navi venue"
         className="rounded-2xl shadow-festive dark:shadow-warm w-full h-48 md:h-[400px] object-cover"
      />
    </div>
  </div>
</section>

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
