import _utils from"./_utils.js";var SEARCH="?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";export const config={runtime:"edge"};export default async function(e){var t,n=new URL(e.url),s=n.searchParams.get("type"),o=n.searchParams.get("page"),i=n.searchParams.get("genre");if(s!=="movie"&&s!=="tv")return new Response("Bad request",_utils.RES_BAD_OPT);t=`${process.env.API_URL}/discover/${s}${SEARCH}`,o!==void 0&&(t=`${t}&page=${o}`),i!==void 0&&(t=`${t}&with_genres=${i}`);const a=await fetch(t,_utils.FETCH_OPT);return a.ok?new Response(a.body,_utils.RES_OPT):new Response("Bad request",_utils.RES_BAD_OPT)}