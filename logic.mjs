export const departments=['내과','가정의학과','이비인후과','정형외과','소아청소년과','안과','피부과','치과','신경과','신경외과','산부인과','비뇨의학과','정신건강의학과','외과','재활의학과'];
export const districts=['중구','동구','북구','수성구'];
export function classify(p,registry){const r=registry.find(r=>r.kakaoId===p.id&&['public','private'].includes(r.type)&&r.source&&r.operator);return r?{type:r.type,operator:r.operator,source:r.source}:{type:'private',classificationBasis:'default'};}
export function groupPlaces(places,registry){const unique=[...new Map(places.map(p=>[p.id,p])).values()].map(p=>({...p,...classify(p,registry)}));return {public:unique.filter(p=>p.type==='public').slice(0,2),private:unique.filter(p=>p.type==='private').slice(0,3),unknown:unique.filter(p=>p.type==='unknown').slice(0,3)};}
export function validLocation(x,y){return Number.isFinite(x)&&Number.isFinite(y)&&x>=-180&&x<=180&&y>=-90&&y<=90;}
