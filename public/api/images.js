import _utils from"./_utils.js";export const config={runtime:"edge"};export default async function(e){var s,n=new URL(e.url),i=n.searchParams.get("i"),t=n.searchParams.get("t");if(t!=="movie"&&t!=="tv")return new Response("Bad request",_utils.RES_BAD_OPT);s=`${process.env.API_URL}/${t}/${i}/images?include_image_language=en`;const o=await fetch(s,_utils.FETCH_OPT);return o.ok?new Response(o.body,_utils.RES_OPT):new Response("Bad request",_utils.RES_BAD_OPT)}