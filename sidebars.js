module.exports = {
  someSidebar: {
    'Hyak Klone': [
      'klone/architecture',
      {
        'Get Started': [
          'index',
          'join-group',
          'account-creation',
          'account-activation',
        ]
      },
      {
        'Setup': [
          'setup/ssh',
          'setup/intracluster-keys',
          'setup/portforwarding',
          'setup/x11',
        ]
      },
      {
        'Storage': [
          'storage/data',
          'storage/gscratch',
        ]
      },
      {
        'Compute': [
          'compute/start-here',
          'compute/scheduling-jobs',
          'compute/checkpoint',
          'compute/resource-monitoring',
        ]
      },
            {
        'GPUs': [
          'gpus/gpu_start',
          'gpus/nvidia_ngc',
          'gpus/ollama_setup',
        ]
      }
    ],

    'Tillicum': [
      'tillicum/architecture',
      'tillicum/tillicum',
      'tillicum/scheduling-jobs',
      'tillicum/environment',
      'tillicum/storage'
    ],

    'Kopah S3 Storage': [
      'storage/kopah',
      'storage/gui',
      'storage/cli',
      'storage/boto3',
      'storage/juicefs',
    ],

    'Lolo Tape Archive': [
      'lolo/lolo',
      'lolo/archive'
    ],
   'Data Transfer': [
       'storage/transfer',
       'storage/cyberduck',
       'storage/globus',
    ],
    'Data Commons': [
      'data-commons/requirements',
      'data-commons/ego4d',
      'data-commons/kitchens',
      'data-commons/fineweb_edu',
      'data-commons/imagenet',
      'data-commons/kinetics',
      'data-commons/olmo-mix-1124',
      'data-commons/tablib',
      'data-commons/tcga',
      'data-commons/the_pile',
    ],
    'Open OnDemand': [
      'ood/start',
      'ood/schedule-job',
      'ood/matlab',
      'ood/jupyter',
      'ood/vscode',
      'ood/rstudio'
    ],
    'Tools & Software': [
      'tools/software',
      'tools/modules',
      'tools/compilers',
      'tools/containers',
      'tools/squashfs',
      'tools/modules-containers',
      'tools/dmtcp',
      'tools/r',
      'tools/python',
      'tools/jupyter',
      'tools/matlab',
      'tools/matemathica',
      {
        'Vs Code': [
          'tools/vscode',
          'tools/vsc-code-server',
          'tools/vsc-proxy-jump',
        ]
      }
    ],

    'Tutorials': [
      {
        'Linux Basics': [
          'hyak101/basics/syllabus',
          'hyak101/basics/login',
          'hyak101/basics/system',
          'hyak101/basics/linux',
          'hyak101/basics/linux-2',
        ]
      },
      {
        'Containers': [
          'hyak101/containers/syllabus',
          'hyak101/containers/background',
          'hyak101/containers/demonstration',
          'hyak101/containers/build',
        ]
      },
      {
        'Slurm': [
          'hyak101/basics/syllabus_slurm',
          'hyak101/basics/jobs',
          'hyak101/basics/arrays',
        ]
      },
      {
        'Advanced Slurm': [
          'hyak101/basics/syllabus_advanced',
          'hyak101/basics/advanced',
          'hyak101/basics/nn_batch',
          'hyak101/basics/nn_array',
          'hyak101/basics/nn_sweep',
        ]
      },
      {
        'Jupyter Notebooks': [
          'hyak101/python/syllabus',
          'hyak101/python/setup',
          'hyak101/python/container',
          'hyak101/python/ssh',
          'hyak101/python/overlay',
          'hyak101/python/slurm-forward',
          'hyak101/python/start-up-seq',
          'hyak101/python/connect-vsc',
          'hyak101/python/interactive',
        ]
      },
    ],

    'Additional Resources': [
      'resources',
      'faq',
      'glossary',
    ],

    'Contribution Guides': [
      'contribute/pull-request',
      'contribute/markdown-guide',
      'contribute/link-markdown',
      'contribute/mdx',
    ],
  }
};