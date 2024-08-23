import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <main></main>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard", // Replace with your dashboard route
      permanent: false, // Use false for a temporary redirect
    },
  };
};
