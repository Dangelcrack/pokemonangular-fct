export interface Pokemon {
    id: number;
    name: string;
    species: Species;
    height: number;
    weight: number;
    types: Type[];
    abilities: Ability[];
    forms: Form[];
  }
  
  export interface Species {
    name: string;
    url: string;
  }
  
  export interface Type {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface Ability {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }
  
  export interface Form {
    name: string;
    url: string;
  }
  