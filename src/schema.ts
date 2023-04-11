// Carries all the data that it means to be a City in Javascript
export interface City {
    id: number;
    empire: string;
    name: string;
    pop: number;
    tax: number;
    prosperityRegional: number;
    prosperityNational: number;
    landInfra: number;
    seaInfra: number;
    terrain: number;
    literacy: number;
    warPop: number;
    trade: number;
    capital: number;
    specialPop: number;
    specialProd: number;
    healthcareSpending: number;
    popTaxMod: number;
    popGrowthMod: number;
    colonialBoost: number;
    resourceIncome: number;
    resourceBoost: number;
    taxBaseIndustry: number;
    specialEconomicNotes: string;
    netProsperity: number;
    netIncome: number;
    resourcesNotes: number;
    surface: string;
    occupiedBy: string;
    resistance: number;
}
