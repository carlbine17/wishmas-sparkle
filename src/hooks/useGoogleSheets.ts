import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface WishlistData {
  name: string;
  wishlist1: string;
  wishlist2: string;
  wishlist3: string;
  nickname: string;
  aboutMe: string;
}

export const useGoogleSheets = (spreadsheetUrl: string) => {
  const [data, setData] = useState<WishlistData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Extract the spreadsheet ID from the URL
        const urlMatch = spreadsheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!urlMatch) {
          throw new Error("Invalid spreadsheet URL");
        }
        
        const spreadsheetId = urlMatch[1];
        const gid = spreadsheetUrl.match(/gid=(\d+)/)?.[1] || "0";
        
        // Construct the CSV export URL
        const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
        
        const response = await fetch(csvUrl);
        
        if (!response.ok) {
          throw new Error("Failed to fetch data from Google Sheets. Please make sure the sheet is publicly accessible.");
        }
        
        const text = await response.text();
        const rows = text.split("\n").map(row => {
          // Parse CSV properly, handling quoted values
          const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
          const matches = row.match(regex);
          return matches ? matches.map(m => m.replace(/^"|"$/g, '').trim()) : [];
        }).filter(row => row.length > 0 && row[0]);
        
        // Skip header row and process data
        const wishlistData: WishlistData[] = rows.slice(1).map(row => {
          return {
            name: row[0] || "",
            wishlist1: row[1] || "",
            wishlist2: row[2] || "",
            wishlist3: row[3] || "",
            nickname: row[4] || "",
            aboutMe: row[5] || ""
          };
        }).filter(item => item.name.trim() !== "");
        
        setData(wishlistData);
        setLoading(false);
        toast.success("Wishlists loaded successfully!");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load wishlists";
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
      }
    };

    fetchData();
  }, [spreadsheetUrl]);

  return { data, loading, error };
};
