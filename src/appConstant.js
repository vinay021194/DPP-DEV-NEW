//Constant for costDriver Analysis Page

export const costDrivers = [
    {
      name: "Polyethylene (Africa)",
      code: "Polyethylene (Africa)",
    },
    {
      name: "Polypropylene (Middle East)",
      code: "Polypropylene (Middle East)",
    },
    {
      name: "Polyethylene (Latin America)",
      code: "Polyethylene (Latin America)",
    },
    {
      name: "Polypropylene (Europe)",
      code: "Polypropylene (Europe)",
    },
    { name: "Polyethylene (Europe)", code: "Polyethylene (Europe)" },
    { name: "Polypropylene (US)", code: "Polypropylene (US)" },
    { name: "Polyethylene (US)", code: "Polyethylene (US)" },
  ];
export const sourceOption = [
  {
    name: "ICIS",
    code: "345",
  },
  {
    name: "IHS",
    code: "123",
  },
];

//Constant for AppTopbar  Page
export const items = [
  {
    index: 1,
    label: "Profile",
    icon: "pi pi-user",
  },

  {
    index: 2,
    label: "Add User",
    icon: "pi pi-user-plus",
  },

  {
    index: 3,
    label: "Edit User",
    icon: "pi pi-user-edit",
  },
  {
    index: 4,
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => {
      window.location = "/";
    },
  },
];
export const menuItems = [
  { label: "Material Overview", icon: "pi pi-fw pi-home", to: "/MaterialOverview" },
  { label: "Demand Prediction", icon: "pi pi-fw pi-pencil", to: "/Materialdatachart" },
  { label: "Cost Drivers Analysis", icon: "pi pi-fw pi-calendar", to: "/CostDriversAnalysis" },
  { label: "Supplier Analysis", icon: "pi pi-fw pi-calendar", to: "/SupplierAnalysis" },
];

//Constant for AppMenu  Page
export   const city = [
  { name: "600234" },
  { name: "678456" },
  { name: "700047" },
  { name: "768971" },
  { name: "789045" },
];
 export const supplierFormulaData = [
  {
    supplier_name: "A",
    formulae: "1.15 * [Polyethylene (Africa)-LLDPE Bulk Africa E Weekly] + 110",
    capacity: "1000",
    lead_time_months: "1",
  },
  {
    supplier_name: "B",

    formulae: "1.18 * [Polypropylene (US)-Homopolymer Bulk US Monthly] + 100",
    capacity: "980",
    lead_time_months: "2",
  },
  {
    supplier_name: "C",
    formulae: "1.20 * [Polypropylene (Middle East)-Film Posted Bulk China Weekly] + 120",
    capacity: "1200",
    lead_time_months: "3",
  },
];