import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  config: {
    initialColorMode: "light",
  },

  colors: {
    p: {
      50: "#f5faff",
      100: "#CCE7FF",
      200: "#99CCFF",
      300: "#66ACFF",
      400: "#3F90FF",
      500: "#0062FF",
      "500a": "#1a91ff20",
      600: "#004BDB",
      700: "#001F7A",
      800: "#001667",
      900: "#00124F",
    },
    ap: {
      50: "#0062FF1b",
      100: "#0062FF2b",
      200: "#0062FF",
      300: "#0062FF",
      400: "#0062FF",
      500: "#0062FF",
      600: "#0062FF",
      700: "#0062FF",
      800: "#0062FF",
      900: "#0062FF",
    },
    error: {
      50: "#FFF5F5",
      100: "#FED7D7",
      200: "#FC8181",
      300: "#FC8181",
      400: "#F56565",
      500: "#E53E3E",
      600: "#C53030",
      700: "#9B2C2C",
      800: "#822727",
      900: "#63171B",
    },
    bnw: {
      200: "white",
      300: "white",
      500: "#191919",
      600: "#191919",
    },
    wnb: {
      200: "#191919",
      300: "#191919",
      500: "white",
      600: "white",
    },
    dark: "#191919",
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark" : "white",
        color: props.colorMode === "dark" ? "wt" : "bt",
      },
    }),
  },

  components: {
    Accordion: {
      baseStyle: (props) => ({
        container: {
          borderColor: "var(--divider)",
        },
        panel: {
          pb: 2,
        },
      }),
    },

    Alert: {
      baseStyle: (props) => ({
        container: {
          borderRadius: 12,
        },
      }),
      variants: {
        // Perbarui varian subtle untuk status error
        subtle: (props) => ({
          container: {
            bg: props.status === "error" ? "var(--reda3)" : undefined,
          },
          icon: {
            color: props.status === "error" ? "red.400" : undefined,
          },
        }),
      },
    },

    Badge: {
      baseStyle: (props) => ({
        p: "4px 12px",
        borderRadius: 6,
        fontSize: [10, null, 12],
        fontWeight: 500,
        // textTransform: "none",
      }),
    },

    Button: {
      baseStyle: {
        fontWeight: 550,
        borderRadius: 8,
      },
      sizes: {
        md: {
          px: 6,
        },
      },
    },

    Checkbox: {
      baseStyle: (props) => ({
        icon: {
          color: "white",
        },
        control: {
          border: props.isInvalid
            ? "1.5px solid #E53E3E"
            : "3px solid var(--divider3) !important",
          _focusVisible: {
            boxShadow: "none !important",
          },
        },
      }),
    },

    Drawer: {
      baseStyle: (props) => ({
        overlay: {
          bg: "#00000011",
          backdropFilter: "blur(5px)",
        },
        dialog: {
          bg: props.colorMode === "dark" ? "dark" : "white",
          boxShadow: "none",
        },
        header: {
          py: "20px",
          pt: "18px",
          px: "24px",
          pr: "20px",
        },
        body: {
          px: "24px",
          py: "0px !important",
          display: "flex",
          flexDirection: "column",
          // minH: window.innerWidth < 500 ? "300px" : "fit-content",
        },
        closeButton: {
          borderRadius: "full",
          right: 4,
          top: 4,
          fontSize: "13px !important",
        },
      }),
    },

    Input: {
      baseStyle: (props) => ({
        field: {
          _autofill: {
            border: "1px solid var(--divider3) !important",
          },
        },
      }),
    },

    Menu: {
      baseStyle: (props) => ({
        groupTitle: {
          opacity: 0.5,
          cursor: "default",
        },
        divider: {
          my: 0,
          // mx: -1,
          borderColor: "var(--divider3)",
        },
        list: {
          // bg: props.colorMode === "dark" ? "dark" : "white",
          bg: "#303030df",
          color: "white",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--divider)",
          overflow: "hidden",
          boxShadow: "none",
          borderRadius: 8,
          p: "0px !important",
          // p: "4px",
        },
        item: {
          // borderRadius: "6px",
          bg: "transparent",
          _hover: { bg: "var(--divider3)" },
          _focus: { border: "none !important", boxShadow: "none !important" },
          _focusVisible: {
            border: "none !important",
            boxShadow: "none !important",
          },
          fontSize: 14,
          justifyContent: "space-between",
          py: 3,
          px: 4,
        },
      }),
    },

    Modal: {
      baseStyle: (props) => ({
        dialogContainer: {
          p: 4,
          className: "scrollY",
        },
        dialog: {
          bg: props.colorMode === "dark" ? "dark" : "white",
          color: props.colorMode === "dark" ? "wt" : "bt",
          // bg: "#252525ee",
          // color: "white !important",
          boxShadow: "none",
          borderRadius: 12,
          // m: 4,
          border: "1px solid var(--divider2)",
          className: "scrollY",
          // maxH: "100%",
        },
        overlay: {
          bg: "#00000011",
          backdropFilter: "blur(8px)",
        },
        header: {
          p: 0,
          // pt: "18px",
          // pr: "20px",
          // pb: "20px",
          // pl: "24px",
        },
        body: {
          px: "24px",
          py: "0px !important",
          display: "flex",
          flexDirection: "column",
          // minH: window.innerWidth < 500 ? "300px" : "fit-content",
        },
        footer: {
          px: "24px",
          pt: "24px",
          pb: "24px",
        },
        closeButton: {
          borderRadius: "full",
          right: 4,
          top: 4,
          fontSize: "13px !important",
          // color: "red.400",
        },
      }),
    },

    Popover: {
      baseStyle: (props) => ({
        popper: {
          minW: "300px !important",
        },
        content: {
          fontSize: 14,
          // pr: 5,
          bg: props.colorMode === "dark" ? "dark" : "white",
          color: props.colorMode === "dark" ? "white" : "dark",
        },
        body: {
          pr: 8,
        },
        arrow: {
          bg: props.colorMode === "dark" ? "dark !important" : "white",
          color: props.colorMode === "dark" ? "dark" : "white",
        },
        closeButton: {
          right: 1,
          fontSize: "12px !important",
        },
      }),
    },

    Radio: {
      baseStyle: (props) => ({
        control: {
          border: "1px solid var(--divider3) !important",
        },
      }),
    },

    Skeleton: {
      baseStyle: (props) => ({
        // bg: "var(--divider3) !important",
        borderRadius: 8,
      }),
    },

    Table: {
      thead: {
        color: "var(--divider3) !important",
      },
      sizes: {
        md: {
          // th: {
          //   py: "16px",
          //   px: "12px",
          // },
          td: {
            py: "12px",
            px: "16px",
          },
        },
      },
    },

    Toast: {
      baseStyle: {
        fontSize: [13, null, 15],
        borderRadius: 8,
        zIndex: 999999999999,
      },
      container: {
        w: "100% !important",
        maxW: "500px !important",
      },
    },

    Tooltip: {
      baseStyle: {
        bg: "#252525ee",
        color: "white !important",
        "--popper-arrow-bg": "#252525ee",
        backdropFilter: "blur(40px)",
        border: "1px solid var(--divider3)",
        borderRadius: 8,
        px: 4,
        py: 2,
      },
    },
  },
});
