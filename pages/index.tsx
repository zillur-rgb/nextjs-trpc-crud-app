import { Box, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.getHello.useQuery();
  return (
    <Box p={8} h={"100vh"} bg={"#98A4F9"}>
      <VStack
        color={"#000"}
        bg={"#fff"}
        h={40}
        p={6}
        fontSize="xl"
        borderRadius={"10px"}
      >
        <Text>{hello.data?.message}</Text>
      </VStack>
    </Box>
  );
};

export default Home;
