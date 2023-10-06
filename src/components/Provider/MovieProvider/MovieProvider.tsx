import React, { createContext, useCallback, useContext, useState } from "react";
import { movieServices } from "../../../services";

export type DataTableMoviesProps = {
  images: { imageName: string; imageUrl: string }[];
  ageRequire: string;
  duration: string;
  subtitle: string;
  releaseDate: string;
  endDate: string;
  id: string;
  title: string;
  description: string;
  price: number;
  actors: string[];
  country: string;
  directors: string[];
  genre: string[];
  language: string;
  updatedAt?: string;
};

type MovieContextType = {
  isLoading: boolean;
  getLimitMovies: (atPage: number) => Promise<void>;
  data: DataTableMoviesProps[];
  totalPagination: number;
  activePage: number;
  limitRow: number;
  setLimitRow: (limitRow: number) => void;
  setActivePage: (activePage: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setData: (data: DataTableMoviesProps[]) => void;
  setTotalPagination: (totalPagination: number) => void;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [data, setData] = useState<DataTableMoviesProps[]>([]);
  const [totalPagination, setTotalPagination] = useState(1);
  const [limitRow, setLimitRow] = useState(10);

  const getLimitMovies = useCallback(
    async (atPage: number) => {
      setIsLoading(true);
      try {
        const res = await movieServices.getLimitMovie({
          page: atPage,
          limit: limitRow,
        });
        if (res.statusCode === 0) {
          const dataConvert = res.data.map(
            (movie: DataTableMoviesProps, index: number) => {
              return {
                stt: index + 1 + (activePage - 1) * limitRow,
                ...movie,
              };
            }
          );

          setTotalPagination(
            (res.rows / limitRow) % 1 === 0
              ? res.rows / limitRow
              : res.rows / limitRow + 1
          );
          setData(dataConvert);
          setIsLoading(false);
        }
      } catch (error) {
        // Xử lý lỗi ở đây
        console.error(error);
        setIsLoading(false);
      }
    },
    [activePage, limitRow]
  );

  return (
    <MovieContext.Provider
      value={{
        limitRow,
        setLimitRow,
        activePage,
        setActivePage,
        isLoading,
        getLimitMovies,
        data,
        totalPagination,
        setTotalPagination,
        setData,
        setIsLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMovie() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovie must be used within a MovieProvider");
  }

  return context;
}
