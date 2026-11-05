export const normalizeDepartment = value => /^(소화기|호흡기|순환기|신장|내분비대사|내분비|감염|류마티스|알레르기|혈액종양)내과$/.test(value) ? '내과' : value;
const clean = value => (value || '').replace(/\s/g, '');
export function matchesInstitution(place, institution) {
 const name = clean(place.place_name).replace(/^대구광역시/, '');
 const address = place.road_address_name || '';
 return name === clean(institution.name) && address.startsWith(`대구 ${institution.district} `) && new RegExp('^' + institution.address.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:$|[ ,(])').test(address.slice(`대구 ${institution.district} `.length));
}
export function eligibleInstitutions(registry, department, input) {
 return registry.filter(r => r.departments.map(normalizeDepartment).includes(normalizeDepartment(department)) && (input.mode === 'nearby' || r.district === input.district));
}
export async function searchPublic(registry, department, input, lookup) {
 const matches = await Promise.all(eligibleInstitutions(registry, department, input).map(async institution => {
  const places = await lookup(institution);
  const p = places.find(p => matchesInstitution(p, institution));
  return p ? {...p, type:'public', operator:institution.operator, source:institution.source} : null;
 }));
 return matches.filter(Boolean).sort((a,b) => input.mode === 'nearby' ? Number(a.distance)-Number(b.distance) : 0);
}
