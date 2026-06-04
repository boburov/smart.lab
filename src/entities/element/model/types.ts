/** Static reference data for a chemical element, used for rendering. */
export interface Element {
  /** Atomic number. */
  number: number;
  /** Chemical symbol. */
  symbol: string;
  /** Full element name. */
  name: string;
  /** CPK/Jmol color as a hex string (e.g. "#FF0D0D"), for atom spheres. */
  color: string;
  /** Covalent radius in Ångströms — useful for bond detection/length. */
  covalentRadius: number;
  /** Van der Waals radius in Ångströms — natural sphere size for rendering. */
  vanDerWaalsRadius: number;
}
