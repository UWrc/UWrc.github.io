module.exports = {
  someSidebar: {
    'Get Started': [
      'index',
      'join-group',
      'account-creation',
      'account-activation',
    ],
    'Setup': [
      'setup/index',
      'setup/ssh',
      'setup/intracluster-keys',
      'setup/portforwarding',
      'setup/x11'
      //'setup/vscode',
    ],
    'Storage': [
      'storage/data',
      'storage/gscratch',
      'storage/transfer',
      'storage/archive',
      {
        'KOPAH S3 Storage': [
          'storage/kopah',
          'storage/gui',
          'storage/cli',
          'storage/boto3',
        ]
      }
    ],
    'Data Commons':
    [
      'data-commons/requirements',
      'data-commons/imagenet',
      'data-commons/tablib',
      'data-commons/the_pile',
    ],
    'Compute': [
      'compute/slurm',
      'compute/scheduling-jobs',
      'compute/checkpoint',
      'compute/resource-monitoring',
    ],
    'Tools & Software': [
      'tools/software',
      'tools/modules',
      'tools/compilers',
      'tools/containers',
      'tools/squashfs',
      'tools/modules-containers',
      'tools/nvidia_ngc',
      'tools/dmtcp',
      'tools/r',
      'tools/python',
      'tools/jupyter',
      'tools/matlab',
      {
        'Vs Code': [
          'tools/vscode',
          'tools/vsc-code-server',
          'tools/vsc-proxy-jump',
        ]
      }
    ],
    'Tutorial: HYAK Basics': [
      'hyak101/basics/syllabus',
      'hyak101/basics/login',
      'hyak101/basics/system',
      'hyak101/basics/linux',
      'hyak101/basics/linux-2',
    ],
    'Tutorial: Containers': [
      'hyak101/containers/syllabus',
      'hyak101/containers/background',
      'hyak101/containers/demonstration',
      'hyak101/containers/build',
    ],
    'Tutorial: SLURM': [
      'hyak101/basics/syllabus_slurm', 
      'hyak101/basics/jobs',
      'hyak101/basics/arrays',
      {
        'Advanced SLURM': [
          'hyak101/basics/advanced',
          'hyak101/basics/nn_batch',
          'hyak101/basics/nn_array',
          'hyak101/basics/nn_bash',
        ]
      },
    ],
    'Tutorial: Jupyter Notebooks': [
      'hyak101/python/syllabus',
      'hyak101/python/setup',
      'hyak101/python/container',
      {
        'Mac/Linux Users': [
          'hyak101/python/ssh',
          'hyak101/python/overlay',
          'hyak101/python/slurm-forward',
          'hyak101/python/start-up-seq',
          'hyak101/python/connect-vsc',
        ]
      },
      {
        'Windows Users': [
          'hyak101/python/win-ssh',
          'hyak101/python/win-overlay',
          'hyak101/python/win-slurm-forward',
          'hyak101/python/win-start-up-seq',
          'hyak101/python/win-connect-vsc',
        ]
      },
      'hyak101/python/interactive',
    ],
    'Additional Resources': [
      'resources',
      'faq',
      'glossary',
    ],
    'Contribution Guides': [
      'contribute/markdown-guide',
      'contribute/link-markdown',
      'contribute/mdx',
    ],
  }
};
