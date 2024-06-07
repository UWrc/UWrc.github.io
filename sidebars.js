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
      'tools/modules-containers',
      'tools/nvidia_ngc',
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
    'Hyak 101 Tutorial': [
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