(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{124:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var o=n(3),a=n(7),r=(n(0),n(173)),i={slug:"mox-to-klone",title:"Migrating from MOX to KLONE",author:"Nam Pho",author_title:"Director for Research Computing",author_url:"https://github.com/npho",author_image_url:"https://avatars3.githubusercontent.com/u/1252858?s=400&v=4",tags:["mox","klone","hyak","hpc","supercomputer","launch","features"]},l={permalink:"/blog/mox-to-klone",source:"@site/blog/2021-05-01-migrating-mox-users.md",description:"If you were previously a proficient MOX user and now find yourself on KLONE, what's new / different? This is a high-level summary, please consult the documentation [link] for more details.",date:"2021-05-01T00:00:00.000Z",tags:[{label:"mox",permalink:"/blog/tags/mox"},{label:"klone",permalink:"/blog/tags/klone"},{label:"hyak",permalink:"/blog/tags/hyak"},{label:"hpc",permalink:"/blog/tags/hpc"},{label:"supercomputer",permalink:"/blog/tags/supercomputer"},{label:"launch",permalink:"/blog/tags/launch"},{label:"features",permalink:"/blog/tags/features"}],title:"Migrating from MOX to KLONE",readingTime:3.565,truncated:!1,nextItem:{title:"Klone Soft Launch",permalink:"/blog/klone"}},s=[{value:"Login",id:"login",children:[]},{value:"Data Transfer",id:"data-transfer",children:[]},{value:"Storage",id:"storage",children:[]},{value:"Compute",id:"compute",children:[]},{value:"Software",id:"software",children:[]}],c={toc:s};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"If you were previously a proficient MOX user and now find yourself on KLONE, what's new / different? This is a high-level summary, please consult the documentation [",Object(r.b)("a",{parentName:"p",href:"/docs"},"link"),"] for more details."),Object(r.b)("h3",{id:"login"},"Login"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Logging in was previously to ",Object(r.b)("inlineCode",{parentName:"li"},"mox.hyak.uw.edu")," now it's ",Object(r.b)("inlineCode",{parentName:"li"},"klone.hyak.uw.edu"),"."),Object(r.b)("li",{parentName:"ul"},"As a reminder login nodes are only to connect to the cluster, navigate the cluster file system, and submit jobs. This applies to both KLONE and MOX. Do not compile codes on the login node or run any programs that require significant compute (get a session with SLURM).")),Object(r.b)("h3",{id:"data-transfer"},"Data Transfer"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Only use the login node to transfer data on KLONE. On MOX you'd have used a build node or could have used the login node if it wasn't very computationally heavy.")),Object(r.b)("h3",{id:"storage"},"Storage"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"The path to lab storage is still ",Object(r.b)("inlineCode",{parentName:"li"},"/gscratch/mylab")," on both KLONE and MOX. You'll need to copy over the data from MOX to KLONE you want to continue using."),Object(r.b)("li",{parentName:"ul"},"Home directories are still 10GB per user, same on both clusters."),Object(r.b)("li",{parentName:"ul"},"Scrubbed exists on KLONE just as it did on MOX at ",Object(r.b)("inlineCode",{parentName:"li"},"/gscratch/scrubbed")," this is a free-for-all space on both clusters where files are automatically deleted after 21 days. "),Object(r.b)("li",{parentName:"ul"},"Some new benefits of the KLONE storage compared to MOX:",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"There are snapshots for gscratch!")," Look inside the ",Object(r.b)("inlineCode",{parentName:"li"},"/gscratch/mylab/.snapshots")," folder for a copy of your lab folder once an hour, every hour, for 24 hours. This is not a backup copy nor a replacement for version management (e.g., ",Object(r.b)("inlineCode",{parentName:"li"},"git"),") but useful for retrieving recent versions or something accidentally deleted."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"More storage!")," Previously you received 500GB or 0.5TB of gscratch quota per node contributed to MOX. Now on KLONE we've doubled your associated storage quota! For example, 2 nodes on MOX would mean 1TB of gscratch but 2 nodes on KLONE now means 2TB of gscratch."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"It's faster!")," We've had reports of performance that's averaging a 30% speed up all else being equal, nothing you need to do aside from use KLONE instead of MOX."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"It's faster than fast!")," While KLONE storage is faster than MOX storage overall, gscratch on KLONE is further turbo charged with a NVMe flash based tier. NVMe flash is among the fastest storage mediums you can get and further differentiating benefit if you use gscratch vs scrubbed on KLONE.")))),Object(r.b)("h3",{id:"compute"},"Compute"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"When submitting a SLURM job, whether interactive (i.e., ",Object(r.b)("inlineCode",{parentName:"li"},"srun"),") or batch (i.e., ",Object(r.b)("inlineCode",{parentName:"li"},"sbatch"),") you'll want to first decide which account to use. This is the group you're part of. You can run the command ",Object(r.b)("inlineCode",{parentName:"li"},"groups")," to see your affiliated accounts and run ",Object(r.b)("inlineCode",{parentName:"li"},"hyakalloc")," to see all the resources (e.g., compute cores, memory, GPUs) used and available associated with each affiliated account."),Object(r.b)("li",{parentName:"ol"},"Then decide if you want to run this job to count under your resource allocation by submitting to the compute partition (i.e., ",Object(r.b)("inlineCode",{parentName:"li"},"-p compute"),") or if you want this job to use idle resources from other groups across the cluster using the checkpoint partition (i.e., ",Object(r.b)("inlineCode",{parentName:"li"},"-p ckpt"),").")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Non-standard partitions.")," Run ",Object(r.b)("inlineCode",{parentName:"li"},"sinfo")," to see the list of all possible partitions, this is only if your group contributed non-standard nodes (e.g., high memory, GPUs) and need to idenitify the appropriate partition names to get immediate use. Otherwise, you'd only be able to get them in a checkpoint capacity."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"There is no build node on KLONE.")," Get an interactive session under an existing account and partition combinatino you have access to. "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"All nodes have internet now on KLONE.")," Do all data transfers to and from KLONE on the KLONE login nodes, the login nodes on KLONE have dual 40 Gbps uplinks to the internet. While the compute nodes on KLONE have internet routing now, they are bottlenecked at 1 Gbps so not suitable for optimal data transfer. ")),Object(r.b)("h3",{id:"software"},"Software"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Singularity containers work the same on both clusters, we encourage this when possible. Refer to our container documentation [",Object(r.b)("a",{parentName:"li",href:"/docs/tools/containers"},"link"),"]."),Object(r.b)("li",{parentName:"ul"},"Modules is updated to the latest versions of the most core parts that the HYAK team maintains (e.g., gcc, Intel, Matlab). Refresh yourself about modules [",Object(r.b)("a",{parentName:"li",href:"/docs/tools/modules"},"link"),"]."),Object(r.b)("li",{parentName:"ul"},'If neither Singularity nor existing modules works for you, you may have to re-compile your codes on KLONE. "contrib" modules works different now on KLONE vs MOX, please check out the details [',Object(r.b)("a",{parentName:"li",href:"/docs/tools/modules#how-do-i-create-shared-lmod-modules-on-klone"},"link"),"].")))}u.isMDXComponent=!0},173:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var o=n(0),a=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),u=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},b=function(e){var t=u(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),b=u(n),d=o,m=b["".concat(i,".").concat(d)]||b[d]||p[d]||r;return n?a.a.createElement(m,l(l({ref:t},c),{},{components:n})):a.a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);