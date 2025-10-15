import { useState, useEffect } from "react";
import { toast } from "sonner";
import Papa from "papaparse";

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
        const urlMatch = spreadsheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!urlMatch) throw new Error("Invalid spreadsheet URL");

        const spreadsheetId = urlMatch[1];
        const gid = spreadsheetUrl.match(/gid=(\d+)/)?.[1] || "0";
        const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;

        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to fetch data");

        const text = await response.text();
        const parsed = Papa.parse(text, { header: true });

        const wishlistData: WishlistData[] = (parsed.data as any[]).map(row => ({
          name: row["NAME"] || "",
          wishlist1: row["Wishlist #1 — All I want for Christmas is this! 😭"] || "",
          wishlist2: row["Wishlist #2 — Bet na bet ko rin kasi ito hihi"] || "",
          wishlist3: row["Wishlist #3 — Hindi ko super want pero it’s a need 🙈"] || "",
          nickname: row["NICKNAME"] || "",
          aboutMe: row["Para mas makilala ka ng nakabunot sa’yo, share mo naman hobbies o mga hilig mo pleaseeee 🤩"] || ""
        })).filter(item => item.name.trim() !== "");

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
