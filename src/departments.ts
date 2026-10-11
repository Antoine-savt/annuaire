import { Zone } from './types';

/*
 * French departments, for the venues outside the Var. A venue's area is either a sector of the Var
 * (its slug, see src/data.ts) or a department stored as "dep-<code>", e.g. "dep-13".
 */

/** Code, name and the name with its French preposition ("dans les Bouches-du-Rhône"). */
const list: [code: string, name: string, where: string][] = [
  ['01', 'Ain', "dans l'Ain"],
  ['02', 'Aisne', "dans l'Aisne"],
  ['03', 'Allier', "dans l'Allier"],
  ['04', 'Alpes-de-Haute-Provence', 'dans les Alpes-de-Haute-Provence'],
  ['05', 'Hautes-Alpes', 'dans les Hautes-Alpes'],
  ['06', 'Alpes-Maritimes', 'dans les Alpes-Maritimes'],
  ['07', 'Ardèche', 'en Ardèche'],
  ['08', 'Ardennes', 'dans les Ardennes'],
  ['09', 'Ariège', 'en Ariège'],
  ['10', 'Aube', "dans l'Aube"],
  ['11', 'Aude', "dans l'Aude"],
  ['12', 'Aveyron', "dans l'Aveyron"],
  ['13', 'Bouches-du-Rhône', 'dans les Bouches-du-Rhône'],
  ['14', 'Calvados', 'dans le Calvados'],
  ['15', 'Cantal', 'dans le Cantal'],
  ['16', 'Charente', 'en Charente'],
  ['17', 'Charente-Maritime', 'en Charente-Maritime'],
  ['18', 'Cher', 'dans le Cher'],
  ['19', 'Corrèze', 'en Corrèze'],
  ['2A', 'Corse-du-Sud', 'en Corse-du-Sud'],
  ['2B', 'Haute-Corse', 'en Haute-Corse'],
  ['21', "Côte-d'Or", "en Côte-d'Or"],
  ['22', "Côtes-d'Armor", "dans les Côtes-d'Armor"],
  ['23', 'Creuse', 'dans la Creuse'],
  ['24', 'Dordogne', 'en Dordogne'],
  ['25', 'Doubs', 'dans le Doubs'],
  ['26', 'Drôme', 'dans la Drôme'],
  ['27', 'Eure', "dans l'Eure"],
  ['28', 'Eure-et-Loir', 'en Eure-et-Loir'],
  ['29', 'Finistère', 'dans le Finistère'],
  ['30', 'Gard', 'dans le Gard'],
  ['31', 'Haute-Garonne', 'en Haute-Garonne'],
  ['32', 'Gers', 'dans le Gers'],
  ['33', 'Gironde', 'en Gironde'],
  ['34', 'Hérault', "dans l'Hérault"],
  ['35', 'Ille-et-Vilaine', 'en Ille-et-Vilaine'],
  ['36', 'Indre', "dans l'Indre"],
  ['37', 'Indre-et-Loire', 'en Indre-et-Loire'],
  ['38', 'Isère', 'en Isère'],
  ['39', 'Jura', 'dans le Jura'],
  ['40', 'Landes', 'dans les Landes'],
  ['41', 'Loir-et-Cher', 'en Loir-et-Cher'],
  ['42', 'Loire', 'dans la Loire'],
  ['43', 'Haute-Loire', 'en Haute-Loire'],
  ['44', 'Loire-Atlantique', 'en Loire-Atlantique'],
  ['45', 'Loiret', 'dans le Loiret'],
  ['46', 'Lot', 'dans le Lot'],
  ['47', 'Lot-et-Garonne', 'en Lot-et-Garonne'],
  ['48', 'Lozère', 'en Lozère'],
  ['49', 'Maine-et-Loire', 'en Maine-et-Loire'],
  ['50', 'Manche', 'dans la Manche'],
  ['51', 'Marne', 'dans la Marne'],
  ['52', 'Haute-Marne', 'en Haute-Marne'],
  ['53', 'Mayenne', 'en Mayenne'],
  ['54', 'Meurthe-et-Moselle', 'en Meurthe-et-Moselle'],
  ['55', 'Meuse', 'dans la Meuse'],
  ['56', 'Morbihan', 'dans le Morbihan'],
  ['57', 'Moselle', 'en Moselle'],
  ['58', 'Nièvre', 'dans la Nièvre'],
  ['59', 'Nord', 'dans le Nord'],
  ['60', 'Oise', "dans l'Oise"],
  ['61', 'Orne', "dans l'Orne"],
  ['62', 'Pas-de-Calais', 'dans le Pas-de-Calais'],
  ['63', 'Puy-de-Dôme', 'dans le Puy-de-Dôme'],
  ['64', 'Pyrénées-Atlantiques', 'dans les Pyrénées-Atlantiques'],
  ['65', 'Hautes-Pyrénées', 'dans les Hautes-Pyrénées'],
  ['66', 'Pyrénées-Orientales', 'dans les Pyrénées-Orientales'],
  ['67', 'Bas-Rhin', 'dans le Bas-Rhin'],
  ['68', 'Haut-Rhin', 'dans le Haut-Rhin'],
  ['69', 'Rhône', 'dans le Rhône'],
  ['70', 'Haute-Saône', 'en Haute-Saône'],
  ['71', 'Saône-et-Loire', 'en Saône-et-Loire'],
  ['72', 'Sarthe', 'dans la Sarthe'],
  ['73', 'Savoie', 'en Savoie'],
  ['74', 'Haute-Savoie', 'en Haute-Savoie'],
  ['75', 'Paris', 'à Paris'],
  ['76', 'Seine-Maritime', 'en Seine-Maritime'],
  ['77', 'Seine-et-Marne', 'en Seine-et-Marne'],
  ['78', 'Yvelines', 'dans les Yvelines'],
  ['79', 'Deux-Sèvres', 'dans les Deux-Sèvres'],
  ['80', 'Somme', 'dans la Somme'],
  ['81', 'Tarn', 'dans le Tarn'],
  ['82', 'Tarn-et-Garonne', 'en Tarn-et-Garonne'],
  ['84', 'Vaucluse', 'dans le Vaucluse'],
  ['85', 'Vendée', 'en Vendée'],
  ['86', 'Vienne', 'dans la Vienne'],
  ['87', 'Haute-Vienne', 'en Haute-Vienne'],
  ['88', 'Vosges', 'dans les Vosges'],
  ['89', 'Yonne', "dans l'Yonne"],
  ['90', 'Territoire de Belfort', 'dans le Territoire de Belfort'],
  ['91', 'Essonne', "dans l'Essonne"],
  ['92', 'Hauts-de-Seine', 'dans les Hauts-de-Seine'],
  ['93', 'Seine-Saint-Denis', 'en Seine-Saint-Denis'],
  ['94', 'Val-de-Marne', 'dans le Val-de-Marne'],
  ['95', "Val-d'Oise", "dans le Val-d'Oise"],
  ['971', 'Guadeloupe', 'en Guadeloupe'],
  ['972', 'Martinique', 'en Martinique'],
  ['973', 'Guyane', 'en Guyane'],
  ['974', 'La Réunion', 'à La Réunion'],
  ['976', 'Mayotte', 'à Mayotte'],
];

/** Every department except the Var, whose venues are filed by sector. */
export const departments = list.map(([code, name, where]) => ({ code, name, where }));

/** Value of the home page filter that shows the venues outside the Var. */
export const OUTSIDE_VAR = 'hors-var';

const PREFIX = 'dep-';

export const departmentZoneSlug = (code: string) => `${PREFIX}${code}`;

/**
 * The area of a venue outside the Var, shaped like a sector so the pages can show it the same way.
 * It has no page of its own: "department" tells the components not to link to it.
 */
export function departmentZone(slug: string): Zone | undefined {
  if (!slug.startsWith(PREFIX)) return undefined;
  const d = departments.find((x) => x.code === slug.slice(PREFIX.length));
  return d && { slug, name: d.name, where: d.where, intro: '', body: '', articles: [], department: d.code };
}
