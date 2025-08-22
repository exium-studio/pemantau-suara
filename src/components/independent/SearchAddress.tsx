import {
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Clock, MagnifyingGlass, MapPin, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useSearchAddress from "../../global/useSearchAddress";
import useSearchMode from "../../global/useSearchMode";
import StringInput from "../dependent/input/StringInput";
import VDivider from "./VDivider";
import CContainer from "./wrapper/CContainer";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN as string;

export default function SearchAddress() {
  const lightDarkColor = useLightDarkColor();

  const {
    searchAddress,
    setSearchAddress,
    searchResult,
    setSearchResult,
    searchSelected,
    setSearchSelected,
  } = useSearchAddress();

  const { searchMode, setSearchMode, toggleSearchMode } = useSearchMode();
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchAddressHistory = JSON.parse(
    localStorage.getItem("search_address_history") as string
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle search
  useEffect(() => {
    if (searchMode && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchMode]);
  useEffect(() => {
    if (searchAddress.trim()) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchAddress
        )}.json?access_token=${MAPBOX_TOKEN}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.features && data.features.length > 0) {
            setSearchResult(data.features);
          }
        });
    } else {
      setSearchResult([]);
    }
  }, [searchAddress, setSearchResult]);

  // Handle click outide
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSearchFocus(false);
        if (!searchAddress) {
          setSearchMode(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchAddress, setSearchMode]);

  // Handle result item click
  const handleItemClick = (result: any, isNotHistoryitem?: boolean) => {
    setSearchSelected(result);
    setSearchAddress(result.place_name);

    if (isNotHistoryitem) {
      const newSearchAddressHistory = searchAddressHistory
        ? [...searchAddressHistory]
        : [];
      newSearchAddressHistory.push(result);
      localStorage.setItem(
        "search_address_history",
        JSON.stringify(newSearchAddressHistory)
      );
    }
  };

  return (
    <CContainer
      w={"100%"}
      // maxW={"420px"}
      fRef={containerRef}
    >
      <CContainer
        w={searchMode ? "100% !important" : "101px"}
        transition={"200ms"}
        borderRadius={12}
      >
        <HStack
          border={"1px solid var(--divider)"}
          bg={lightDarkColor}
          borderRadius={
            searchMode &&
            searchFocus &&
            (searchAddressHistory || searchResult.length > 0)
              ? "12px 12px 0 0"
              : 12
          }
          p={1}
          gap={searchMode ? 0 : 1}
          w={"100%"}
          // maxW={"420px"}
          transition={"200ms"}
          align={"stretch"}
          zIndex={4}
        >
          <Image
            src={"/asset/favicon.svg"}
            flexShrink={0}
            h={searchMode ? "0" : "20px"}
            my={"auto"}
            mx={searchMode ? 0 : "10px"}
            // mx={searchMode ? 0 : 2}
            visibility={searchMode ? "hidden" : "visible"}
          />

          <VDivider
            my={1}
            w={searchMode ? "0" : "2px"}
            visibility={searchMode ? "hidden" : "visible"}
          />

          {/* Toggle Search Mode */}
          <Tooltip
            label={"Toggle Search Mode"}
            placement="right"
            openDelay={500}
          >
            <IconButton
              aria-label="pencarian"
              icon={<Icon as={MagnifyingGlass} fontSize={iconSize} />}
              className="btn"
              borderRadius={6}
              onClick={toggleSearchMode}
            />
          </Tooltip>

          {/* Input Search */}
          <StringInput
            w={"100%"}
            fRef={searchRef}
            name="search"
            onChangeSetter={(input) => setSearchAddress(input || "")}
            pl={2}
            pr={searchSelected ? 2 : 4}
            inputValue={searchAddress}
            placeholder="Cari..."
            border={"transparent !important"}
            onFocus={() => setSearchFocus(true)}
            _focus={{ border: "transparent !important" }}
            visibility={searchMode ? "visible" : "hidden"}
            placeholderprops={{ visibility: searchMode ? "visible" : "hidden" }}
          />

          {/* Clear Search */}
          {searchMode && searchSelected && (
            <IconButton
              aria-label="clear pencarian"
              icon={<Icon as={X} fontSize={iconSize} />}
              className="btn"
              borderRadius={"full"}
              minW="30px !important"
              h="30px !important"
              mt={"5px"}
              mr={"5px"}
              onClick={() => {
                setSearchSelected("");
                setSearchAddress("");
                if (searchRef.current) {
                  searchRef.current.focus();
                }
              }}
            />
          )}
        </HStack>

        <CContainer
          w={"100%"}
          h={
            searchMode &&
            searchFocus &&
            (searchAddressHistory || searchResult.length > 0)
              ? "fit-content"
              : "0px"
          }
          maxH={
            searchMode &&
            searchFocus &&
            (searchAddressHistory || searchResult.length > 0)
              ? "200px"
              : "0px"
          }
          transition={"200ms"}
        >
          <CContainer
            mt={-8}
            pt={8}
            bg={lightDarkColor}
            borderRadius={"0 0 12px 12px"}
            w={"100%"}
            // maxW={"420px"}
            overflowY="auto"
            className="scrollY"
            zIndex={1}
            border={searchMode && searchFocus ? "1px solid var(--divider)" : ""}
            shadow={searchMode && searchFocus ? "sm" : ""}
          >
            {/* Render Search Result */}
            {searchAddress && (
              <>
                {searchResult?.length > 0 &&
                  searchResult.map((result: any, i: number) => (
                    <HStack
                      key={i}
                      p={3}
                      px={4}
                      cursor="pointer"
                      _hover={{ bg: "var(--tg)", color: "p.500" }}
                      transition={"200ms"}
                      onClick={() => handleItemClick(result, true)}
                    >
                      <Icon as={MapPin} mt={"-2px"} fontSize={iconSize} />
                      <Text noOfLines={1}>{result.place_name}</Text>
                    </HStack>
                  ))}
              </>
            )}

            {/* Render History */}
            {!searchAddress && (
              <>
                {searchAddressHistory &&
                  searchAddressHistory
                    .reverse()
                    ?.slice(0, 8)
                    .map((history: any, i: number) => (
                      <HStack
                        key={i}
                        p={3}
                        px={4}
                        cursor="pointer"
                        _hover={{ bg: "var(--tg)", color: "p.500" }}
                        transition={"200ms"}
                        onClick={() => handleItemClick(history)}
                      >
                        <Icon as={Clock} fontSize={iconSize} />
                        <Text noOfLines={1}>{history.place_name}</Text>
                      </HStack>
                    ))}
              </>
            )}
          </CContainer>
        </CContainer>
      </CContainer>
    </CContainer>
  );
}
