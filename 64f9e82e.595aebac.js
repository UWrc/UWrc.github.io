(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{113:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return m}));var a=n(3),o=n(7),r=(n(0),n(174)),i=["components"],l={id:"scheduling-jobs",title:"Scheduling Jobs","sidebar-label":"Scheduling Jobs"},s={unversionedId:"compute/scheduling-jobs",id:"compute/scheduling-jobs",isDocsHomePage:!1,title:"Scheduling Jobs",description:'KLONE uses the SLURM job scheduler. When you first ssh into KLONE (e.g., klone.hyak.uw.edu) you land on one of the two login nodes (i.e., klone1, klone2). Login nodes are shared amongst all users to transfer data, navigate the file system, and request resource slices to perform heavy duty computing. You should not use login nodes for heavy compute and automated mechanisms exist to monitor and enforce violations. The tool used is "arbiter2" and you will receive an email for each offending process (Gardner, Migacz, and Haymore 2019).',source:"@site/docs/compute/scheduling-jobs.md",slug:"/compute/scheduling-jobs",permalink:"/docs/compute/scheduling-jobs",version:"current",sidebar:"someSidebar",previous:{title:"Start Here",permalink:"/docs/compute/slurm"},next:{title:"Start Here",permalink:"/docs/tools/software"}},c=[{value:"Compute Resources",id:"compute-resources",children:[{value:"Accounts",id:"accounts",children:[]},{value:"Partitions",id:"partitions",children:[]}]},{value:"Job Types",id:"job-types",children:[{value:"SLURM Arguments",id:"slurm-arguments",children:[]},{value:"Interactive Jobs",id:"interactive-jobs",children:[]},{value:"Slurm Environment Variables",id:"slurm-environment-variables",children:[]}]},{value:"Batch Jobs",id:"batch-jobs",children:[{value:"Single Node Batch Jobs",id:"single-node-batch-jobs",children:[]},{value:"Multiple Node Batch Jobs",id:"multiple-node-batch-jobs",children:[]},{value:"Self-Limiting Your Number of Running Jobs",id:"self-limiting-your-number-of-running-jobs",children:[]}]},{value:"Common Slurm Error Messages",id:"common-slurm-error-messages",children:[]},{value:"Utility Commands",id:"utility-commands",children:[]},{value:"FOR ADVANCED USERS ONLY: <code>salloc</code>",id:"for-advanced-users-only-salloc",children:[]},{value:"Man Pages",id:"man-pages",children:[]},{value:"References",id:"references",children:[]}],b={toc:c};function m(e){var t=e.components,n=Object(o.a)(e,i);return Object(r.b)("wrapper",Object(a.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"KLONE")," uses the ",Object(r.b)("a",{parentName:"p",href:"https://slurm.schedmd.com/overview.html"},"SLURM")," job scheduler. When you first ssh into KLONE (e.g., ",Object(r.b)("inlineCode",{parentName:"p"},"klone.hyak.uw.edu"),") you land on one of the two login nodes (i.e., ",Object(r.b)("inlineCode",{parentName:"p"},"klone1"),", ",Object(r.b)("inlineCode",{parentName:"p"},"klone2"),'). Login nodes are shared amongst all users to transfer data, navigate the file system, and request resource slices to perform heavy duty computing. You should not use login nodes for heavy compute and automated mechanisms exist to monitor and enforce violations. The tool used is "arbiter2" and you will receive an email for each offending process ',Object(r.b)("a",{parentName:"p",href:"#ref_arbiter"},"(Gardner, Migacz, and Haymore 2019)"),"."),Object(r.b)("h2",{id:"compute-resources"},"Compute Resources"),Object(r.b)("p",null,"The SLURM scheduler has two high-level concepts you need to know, ",Object(r.b)("a",{parentName:"p",href:"#accounts"},"accounts")," and ",Object(r.b)("a",{parentName:"p",href:"#partitions"},"partitions"),"."),Object(r.b)("h3",{id:"accounts"},"Accounts"),Object(r.b)("p",null,"With the ",Object(r.b)("inlineCode",{parentName:"p"},"hyakalloc")," you can further see not only which accounts you are able to submit jobs to but also their current utilization. Resource limits are directly proportional to what was contributed by that group."),Object(r.b)("h3",{id:"partitions"},"Partitions"),Object(r.b)("p",null,"If you run ",Object(r.b)("inlineCode",{parentName:"p"},"sinfo")," you can see all the partitions available. Each partition represents a class of node from the standard ",Object(r.b)("inlineCode",{parentName:"p"},"compute")," partition to those with high-memory or for different types of GPUs."),Object(r.b)("h2",{id:"job-types"},"Job Types"),Object(r.b)("p",null,"There are a few popular types of jobs you could submit:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"#interactive-jobs"},"interactive")," where you and test out your workflows live,"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"#batch-jobs"},"batch")," which are unattended (you get an email when completed), and"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"#null"},"recurring"),' or "CRON-like" processes that happen on a regular basis.')),Object(r.b)("h3",{id:"slurm-arguments"},"SLURM Arguments"),Object(r.b)("p",null,"These are the common and recommended arguments suggested at a minimum to get a job in any form."),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Arguments"),Object(r.b)("th",{parentName:"tr",align:null},"Command Flags"),Object(r.b)("th",{parentName:"tr",align:null},"Notes"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"Account"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"-A")," or ",Object(r.b)("inlineCode",{parentName:"td"},"--account")),Object(r.b)("td",{parentName:"tr",align:null},"What lab are you part of? If you run the ",Object(r.b)("inlineCode",{parentName:"td"},"groups")," command you can see what groups (usually labs) you're a member of, these are associated with resource limits on the cluster. See the ",Object(r.b)("a",{parentName:"td",href:"#accounts"},"accounts")," section for additional information.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"Partition"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"-p")," or ",Object(r.b)("inlineCode",{parentName:"td"},"--partition")),Object(r.b)("td",{parentName:"tr",align:null},"What resource partition are you interested in using? This could be anything you see when you run ",Object(r.b)("inlineCode",{parentName:"td"},"sinfo")," as each partition corresponds to a class of nodes (e.g., high memory, GPU). See the ",Object(r.b)("a",{parentName:"td",href:"#partitions"},"partitions")," section for additional information.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"Nodes"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"-N")," or ",Object(r.b)("inlineCode",{parentName:"td"},"--nodes")),Object(r.b)("td",{parentName:"tr",align:null},"How many nodes are these resources spread across? In the overwhelming number of cases this is 1 (for a single node) but more sophisticated multi-node jobs could be run if your code supports it.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"Cores"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"-c")," or ",Object(r.b)("inlineCode",{parentName:"td"},"--cpus-per-task")),Object(r.b)("td",{parentName:"tr",align:null},"How many compute cores do you need? Not all codes can make use of multiple cores and if they do, the performance of the code is not always linear with the resources requested. If in doubt consider contacting the research computing team to assist in this optimization.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"Memory"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"--mem")),Object(r.b)("td",{parentName:"tr",align:null},"How much memory do you need for this job? This is in the format ",Object(r.b)("inlineCode",{parentName:"td"},"size[units]")," were size is a number and units are either ",Object(r.b)("inlineCode",{parentName:"td"},"M"),", ",Object(r.b)("inlineCode",{parentName:"td"},"G"),", or ",Object(r.b)("inlineCode",{parentName:"td"},"T")," for megabyte, gigabyte, and terabyte respectively. Megabyte is the default unit if none is provided.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"Time"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"-t")," or ",Object(r.b)("inlineCode",{parentName:"td"},"--time")),Object(r.b)("td",{parentName:"tr",align:null},"What's the maximum runtime for this job? Common acceptable time formats include ",Object(r.b)("inlineCode",{parentName:"td"},"hours:minutes:seconds"),", ",Object(r.b)("inlineCode",{parentName:"td"},"days-hours"),", and ",Object(r.b)("inlineCode",{parentName:"td"},"minutes"),".")))),Object(r.b)("h3",{id:"interactive-jobs"},"Interactive Jobs"),Object(r.b)("p",null,"Resources for interactive jobs are attained either using ",Object(r.b)("inlineCode",{parentName:"p"},"srun")," or ",Object(r.b)("inlineCode",{parentName:"p"},"salloc"),". To get resources on a compute node interactively consider the example below."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell"},"srun -A mylab -p compute -N 1 -c 4 --mem=10G --time=2:30:00 --pty bash\n")),Object(r.b)("p",null,"In this case you are requesting a slice of the standard compute node class that your group ",Object(r.b)("inlineCode",{parentName:"p"},"mylab")," contributed to the cluster. You are asking for 4 compute cores with 10GB of memory for 2 hours and 30 minutes spread across 1 node (single machine). Your method of interaction is the bash shell."),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"If ",Object(r.b)("inlineCode",{parentName:"p"},"-N")," or ",Object(r.b)("inlineCode",{parentName:"p"},"--nodes")," is >1 you are automatically placed into a session of one of the allocated nodes.  To view the names of the remainder of your allocated nodes use ",Object(r.b)("inlineCode",{parentName:"p"},"scontrol show hostnames"),"."))),Object(r.b)("div",{className:"admonition admonition-important alert alert--info"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"If you are using an interactive node to run a parallel application such as Python multiprocessing, MPI, OpenMP etc. then the number given for the ",Object(r.b)("inlineCode",{parentName:"p"},"--ntasks-per-node")," option must match the number of processes used by your application."))),Object(r.b)("hr",null),Object(r.b)("p",null,"If your group has an interactive node, use the option ",Object(r.b)("inlineCode",{parentName:"p"},"-p <group_name>-int")," like so: "),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell"},"srun -p <group_name>-int -A <group_name> --time=<time> --mem=<size>G --pty /bin/bash\n")),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("ul",{parentName:"div"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"--pty /bin/bash")," ",Object(r.b)("strong",{parentName:"li"},"must")," be the last option given in above command"),Object(r.b)("li",{parentName:"ul"},"If you do not obtain a build node with the specified ",Object(r.b)("inlineCode",{parentName:"li"},"--mem")," value, try smaller memory values")))),Object(r.b)("p",null,"For more details, read the ",Object(r.b)("a",{parentName:"p",href:"https://slurm.schedmd.com/srun.html"},Object(r.b)("inlineCode",{parentName:"a"},"srun")," man page"),"."),Object(r.b)("h3",{id:"slurm-environment-variables"},"Slurm Environment Variables"),Object(r.b)("p",null,"When a job scheduled by Slurm begins, it needs to about how it was scheduled, what its working directory is, who submitted the job, the number of nodes and cores allocated to it, etc.  This information is passed to Slurm via environment variables.  Additionally, these environment variables are also used as default values by programs like ",Object(r.b)("inlineCode",{parentName:"p"},"mpirun"),".  To view a node's Slurm environment variables, use ",Object(r.b)("inlineCode",{parentName:"p"},"export | grep SLURM"),".\nA comprehensive list of the environment variables Slurm sets for each job can be found at the end of the ",Object(r.b)("a",{parentName:"p",href:"https://slurm.schedmd.com/sbatch.html"},Object(r.b)("inlineCode",{parentName:"a"},"sbatch")," man page"),"."),Object(r.b)("h2",{id:"batch-jobs"},"Batch Jobs"),Object(r.b)("h3",{id:"single-node-batch-jobs"},"Single Node Batch Jobs"),Object(r.b)("p",null,"Below is a slurm script template.  Submit a batch job from the ",Object(r.b)("inlineCode",{parentName:"p"},"mox")," login node by calling ",Object(r.b)("inlineCode",{parentName:"p"},"sbatch <script_name>.slurm"),"."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell",metastring:'title="<script_name>.slurm" terminal=true',title:'"<script_name>.slurm"',terminal:"true"},"#!/bin/bash\n\n#SBATCH --job-name=<name>\n#SBATCH --mail-type=<status>\n#SBATCH --mail-user=<email>\n\n#SBATCH --account=<lab>\n#SBATCH --partition=<node_type>\n#SBATCH --nodes=<num_nodes>\n#SBATCH --ntasks-per-node=<cores_per_node>\n#SBATCH --mem=<size[unit]>\n#SBATCH --gpus=<type:quantity> \n#SBATCH --time=<time> # Max runtime in DD-HH:MM:SS format.\n\n#SBATCH --chdir=<working directory>\n#SBATCH --export=all\n#SBATCH --output=<file> # where STDOUT goes\n#SBATCH --error=<file> # where STDERR goes\n\n# Modules to use (optional).\n<e.g., module load singularity>\n\n# Your programs to run.\n<my_programs>\n")),Object(r.b)("h3",{id:"multiple-node-batch-jobs"},"Multiple Node Batch Jobs"),Object(r.b)("p",null,"If your batch job is using multiple nodes, your program should also know how to use all the nodes (e.g. your program is an MPI program)."),Object(r.b)("p",null,"The value given for ",Object(r.b)("inlineCode",{parentName:"p"},"--nodes")," must be less than or equal to the total number of nodes owned by your group."),Object(r.b)("p",null,"The value given for ",Object(r.b)("inlineCode",{parentName:"p"},"--ntasks-per-node")," should be either ",Object(r.b)("inlineCode",{parentName:"p"},"28")," for older ",Object(r.b)("inlineCode",{parentName:"p"},"mox")," nodes or ",Object(r.b)("inlineCode",{parentName:"p"},"40")," for newer nodes.  Do not increase these values.  You can decrease these values if your program is running out of memory on a node."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell"},"SBATCH --nodes=4\n\nSBATCH --ntasks-per-node=28\n# OR\nSBATCH --ntasks-per-node=40\n")),Object(r.b)("h3",{id:"self-limiting-your-number-of-running-jobs"},"Self-Limiting Your Number of Running Jobs"),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"This feature is not enabled on the ",Object(r.b)("inlineCode",{parentName:"p"},"ckpt")," partition"))),Object(r.b)("p",null,"At times you may wish to self-limit the number of jobs that will be run simultaneously in order to leave nodes in your group's partition for other group members.  "),Object(r.b)("p",null,"To achieve this, you can add ",Object(r.b)("inlineCode",{parentName:"p"},"SBATCH --qos=MaxJobs<n>")," where ",Object(r.b)("inlineCode",{parentName:"p"},"n")," is a number between 1 and 10 to tell the job scheduler to allow only ",Object(r.b)("inlineCode",{parentName:"p"},"n")," jobs running with the option ",Object(r.b)("inlineCode",{parentName:"p"},"--qos=MaxJobs<n>"),".  "),Object(r.b)("p",null,"However, any other jobs without this option set are not limited and jobs with a different value of ",Object(r.b)("inlineCode",{parentName:"p"},"n")," are gated separately."),Object(r.b)("h2",{id:"common-slurm-error-messages"},"Common Slurm Error Messages"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"strong"},"slurmstepd: error: Exceeded job memory limit")),": your program uses more memory than you allotted during node creation and it has run out of memory.  Get a node with more memory and try again."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"strong"},"(ReqNodeNotAvail, UnavailableNodes:n[<node numbers list>]")),": your node will not expire (and might be running one of your jobs) before the next scheduled maintenance day.  Either get a node with a shorter ",Object(r.b)("inlineCode",{parentName:"li"},"--time")," duration or wait until after the maintenance has been completed."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"strong"},"Unable to allocate resources: Invalid account or account/partition combination specified")),": you used ",Object(r.b)("inlineCode",{parentName:"li"},"-p <group_name> -A <group_name>")," and you do not belong to that group.")),Object(r.b)("h2",{id:"utility-commands"},"Utility Commands"),Object(r.b)("p",null,"With ",Object(r.b)("inlineCode",{parentName:"p"},"<net_id>")," as your UW NetID and ",Object(r.b)("inlineCode",{parentName:"p"},"<group_name>")," as your Hyak group partition name, and ",Object(r.b)("inlineCode",{parentName:"p"},"<job_id>")," as an individual job ID:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sinfo.html"},Object(r.b)("inlineCode",{parentName:"a"},"sinfo"))," is used to view information about ",Object(r.b)("inlineCode",{parentName:"li"},"mox")," nodes and partitions.  Use ",Object(r.b)("inlineCode",{parentName:"li"},"sinfo -p <group_name>")," to view information about your group's partition or allocation."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/squeue.html"},Object(r.b)("inlineCode",{parentName:"a"},"squeue"))," is used to view information about jobs located in the scheduling queue.  Use ",Object(r.b)("inlineCode",{parentName:"li"},"squeue -p <group_name>")," to view information about your group's nodes.  Use ",Object(r.b)("inlineCode",{parentName:"li"},"squeue -u <net_id>")," to view your jobs."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/scancel.html"},Object(r.b)("inlineCode",{parentName:"a"},"scancel"))," is used to cancel jobs.  Use ",Object(r.b)("inlineCode",{parentName:"li"},"scancel <job_id>")," to cancel a job with the given job ID, or use ",Object(r.b)("inlineCode",{parentName:"li"},"scancel -u <net_id>")," to cancel all of your jobs."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sstat.html"},Object(r.b)("inlineCode",{parentName:"a"},"sstat"))," displays status information of a running job pertaining to CPU, Task, Node, Resident Set Size (RSS), and Virtual Memory (VM) statistics.  Read the ",Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sstat.html"},"man page")," for a comprehensive list of format options.  "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sacct.html"},Object(r.b)("inlineCode",{parentName:"a"},"sacct"))," displays information about completed jobs.  Read the ",Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sacct.html"},"man page")," for a comprehensive list of format options."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sreport.html"},Object(r.b)("inlineCode",{parentName:"a"},"sreport"))," generates reports about job usage and cluster utilization from Slurm accounting (",Object(r.b)("inlineCode",{parentName:"li"},"sacct"),") data.  For example, to get historical usage the group ",Object(r.b)("inlineCode",{parentName:"li"},"<group_name>")," in March 2020, use ",Object(r.b)("inlineCode",{parentName:"li"},"sreport cluster UserUtilizationByAccount Start=2020-03-01 End=2020-03-31 Accounts=<group_name>"),".")),Object(r.b)("h2",{id:"for-advanced-users-only-salloc"},"FOR ADVANCED USERS ONLY: ",Object(r.b)("inlineCode",{parentName:"h2"},"salloc")),Object(r.b)("div",{className:"admonition admonition-warning alert alert--danger"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"Do not use ",Object(r.b)("inlineCode",{parentName:"p"},"salloc")," unless you have a specific reason."))),Object(r.b)("p",null,"To get nodes for interactive use:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell"},"salloc -N <num_nodes> -p <group_name> -A <group_name> --time=<time> --mem=<size>G\n")),Object(r.b)("p",null,"When this command runs, you will have been allocated ",Object(r.b)("inlineCode",{parentName:"p"},"num_nodes")," nodes ",Object(r.b)("strong",{parentName:"p"},"but you will still be on the ",Object(r.b)("inlineCode",{parentName:"strong"},"mox")," login node"),"."),Object(r.b)("p",null,"Use ",Object(r.b)("inlineCode",{parentName:"p"},"srun <command>")," to run commands on all allocated nodes."),Object(r.b)("p",null,"Use ",Object(r.b)("inlineCode",{parentName:"p"},"scontrol show hostnames")," to get the hostnames of your allocated nodes.  Once you have the hostnames, you can ",Object(r.b)("inlineCode",{parentName:"p"},"ssh")," to them using ",Object(r.b)("inlineCode",{parentName:"p"},"ssh <hostname>")," and then use them for your work (e.g. Apache Spark, Hadoop, etc.)"),Object(r.b)("p",null,"Example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell-session",metastring:"terminal=true",terminal:"true"},"[linj66@mox2 ~]$ salloc -N 2 -p stf -A stf --time=5 --mem=5G\nsalloc: Pending job allocation 2620960\nsalloc: job 2620960 queued and waiting for resources\nsalloc: job 2620960 has been allocated resources\nsalloc: Granted job allocation 2620960\nsalloc: Waiting for resource configuration\nsalloc: Nodes n[2148-2149] are ready for job\n[linj66@mox2 ~]$ srun echo \"test\"\ntest\ntest\n[linj66@mox2 ~]$ scontrol show hostnames\nn2148\nn2149\n[linj66@mox2 ~]$ ssh n2148\nWarning: Permanently added 'n2148,10.64.56.248' (ECDSA) to the list of known hosts.\n[linj66@n2148 ~]$\n")),Object(r.b)("h2",{id:"man-pages"},"Man Pages"),Object(r.b)("p",null,"All of these man pages can also be viewed on ",Object(r.b)("inlineCode",{parentName:"p"},"mox")," by running ",Object(r.b)("inlineCode",{parentName:"p"},"man <command>"),". "),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sacct.html"},Object(r.b)("inlineCode",{parentName:"a"},"sacct"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/salloc.html"},Object(r.b)("inlineCode",{parentName:"a"},"salloc"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sbatch.html"},Object(r.b)("inlineCode",{parentName:"a"},"sbatch"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/scancel.html"},Object(r.b)("inlineCode",{parentName:"a"},"scancel"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/scontrol.html"},Object(r.b)("inlineCode",{parentName:"a"},"scontrol"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sinfo.html"},Object(r.b)("inlineCode",{parentName:"a"},"sinfo"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/squeue.html"},Object(r.b)("inlineCode",{parentName:"a"},"squeue"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sreport.html"},Object(r.b)("inlineCode",{parentName:"a"},"sreport"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/srun.html"},Object(r.b)("inlineCode",{parentName:"a"},"srun"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://slurm.schedmd.com/sstat.html"},Object(r.b)("inlineCode",{parentName:"a"},"sstat")))),Object(r.b)("h2",{id:"references"},"References"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},'Gardner, Dylan, Robben Migacz, and Brian Haymore. "Arbiter: Dynamically Limiting Resource Consumption on Login Nodes." Proceedings of the Practice and Experience in Advanced Research Computing on Rise of the Machines (learning). 2019. 1-7. [DOI: ',Object(r.b)("a",{parentName:"li",href:"https://doi.org/10.1145/3332186.3333043"},"10.1145/3332186.3333043"),"] [Code: ",Object(r.b)("a",{parentName:"li",href:"https://gitlab.chpc.utah.edu/arbiter2/arbiter2"},"Gitlab"),"] ",Object(r.b)("a",{name:"ref_arbiter"})),Object(r.b)("li",{parentName:"ol"})))}m.isMDXComponent=!0},174:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return u}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),b=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=b(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=b(n),p=a,u=m["".concat(i,".").concat(p)]||m[p]||d[p]||r;return n?o.a.createElement(u,l(l({ref:t},c),{},{components:n})):o.a.createElement(u,l({ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);