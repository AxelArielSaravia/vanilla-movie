import _utils from"./_utils.js";export const config={runtime:"edge"};export default async function(e){var t,s=new URL(e.url),o=s.searchParams.get("p"),n=s.searchParams.get("t");if(n!=="movie"&&n!=="tv")return new Response("Bad request",_utils.RES_BAD_OPT);t=`${process.env.API_URL}/${n}/top_rated`,o!==void 0&&(t=`${t}?page=${o}`);const i=await fetch(t,_utils.FETCH_OPT);return i.ok?new Response(i.body,_utils.RES_OPT):new Response("Bad request",_utils.RES_BAD_OPT)}