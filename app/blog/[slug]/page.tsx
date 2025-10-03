225|         <div className="text-sm text-neutral-500 mt-2 flex flex-wrap items-center gap-2">
226|           {post.publishDate && (
227|             <time dateTime={post.publishDate}>
228|               {new Date(post.publishDate).toLocaleDateString()}
229|             </time>
230|           )}
231|           {post.categories && post.categories.length > 0 && post.categories.map((cat) => (
232|             <span key={cat} className="flex items-center">
233|               <span>•</span>
234|               <Link
235|                 href={`/blog/category/${encodeURIComponent(cat)}`}
236|                 className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs hover:bg-neutral-50 ml-1"
237|               >
238|                 {cat}
239|               </Link>
240|             </span>
241|           ))}
242|           {post.tags?.length ? (
243|             <>
244|               <span>•</span>
245|               <span className="flex flex-wrap gap-1">
246|                 {post.tags.map((t: string) => (
247|                   <Link
248|                     key={t}
249|                     href={`/blog/tag/${encodeURIComponent(t)}`}
250|                     className="inline-flex items-center rounded-full border bg-neutral-50 px-2 py-0.5 text-xs hover:bg-neutral-100"
251|                   >
252|                     #{t}
253|                   </Link>
254|                 ))}
255|               </span>
256|             </>
257|           ) : null}
258|         </div>
