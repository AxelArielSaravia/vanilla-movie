import _utils from"./_utils.js";var SEARCH="?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";export const config={runtime:"edge"};export default async function(e){var t,n=new URL(e.url),s=n.searchParams.get("t"),o=n.searchParams.get("p"),i=n.searchParams.get("g"),a=n.searchParams.get("ca"),r=n.searchParams.get("cr"),c=n.searchParams.get("co");if(s!=="movie"&&s!=="tv")return new Response("Bad request",_utils.RES_BAD_OPT);t=`${process.env.API_URL}/discover/${s}${SEARCH}`,o!==null&&(t=`${t}&page=${o}`),i!==null?t=`${t}&with_genres=${i}`:a!==null?t=`${t}&with_cast=${a}`:r!==null?t=`${t}&with_crew=${r}`:c!==null&&(t=`${t}&with_companies=${c}`);const l=await fetch(t,_utils.FETCH_OPT);return l.ok?new Response(l.body,_utils.RES_OPT):new Response("Bad request",_utils.RES_BAD_OPT)}