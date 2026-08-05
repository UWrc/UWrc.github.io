module.exports = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/join-group',
        'getting-started/account-creation',
        'getting-started/account-activation',
        'getting-started/ssh-login',
      ],
    },
    {
      type: 'category',
      label: 'Systems',
      items: [
        {
          type: 'category',
          label: 'Klone (HPC)',
          items: [
            'systems/klone/architecture',
            'systems/klone/get-started',
            'systems/klone/storage',
            'systems/klone/scheduling-jobs',
            'systems/klone/gpus',
          ],
        },
        {
          type: 'category',
          label: 'Tillicum (GPU)',
          items: [
            'systems/tillicum/architecture',
            'systems/tillicum/get-started',
            'systems/tillicum/storage',
            'systems/tillicum/scheduling-jobs',
          ],
        },
        {
          type: 'category',
          label: 'Kopah (S3 Storage)',
          items: [
            'systems/kopah/overview',
            {
              type: 'category',
              label: 'Storage',
              items: [
                'systems/kopah/tools/gui',
                'systems/kopah/tools/cli',
                'systems/kopah/tools/boto3',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Lolo (Tape Archive)',
          items: [
            'systems/lolo/overview',
            'systems/lolo/storage',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'category',
          label: 'Software Environments',
          items: [
            'guides/software/modules',
            'guides/software/compilers',
            'guides/software/conda-python',
            'guides/software/containers',
            'guides/software/nvidia-ngc',
            'guides/software/ollama',
          ],
        },
        {
          type: 'category',
          label: 'Open OnDemand',
          items: [
            'guides/ood/getting-started',
            {
              type: 'category',
              label: 'Interactive Apps',
              items: [
                'guides/ood/apps/desktop',
                'guides/ood/apps/jupyter',
                'guides/ood/apps/vscode',
                'guides/ood/apps/matlab',
                'guides/ood/apps/rstudio',
              ],
            },

          ],
        },
        {
          type: 'category',
          label: 'Data Transfer',
          items: [
            'guides/data-transfer/globus',
            'guides/data-transfer/cyberduck',
            'guides/data-transfer/scp-rsync',
          ],
        },
        {
          type: 'category',
          label: 'Applications',
          items: [
            'guides/applications/jupyter',
            {
              type: 'category',
              label: 'VS Code',
              items: [
                'guides/applications/vscode/overview',
                'guides/applications/vscode/code-server',
                'guides/applications/vscode/proxy-jump',
              ],
            },
            'guides/applications/r-rstudio',
            'guides/applications/matlab',
            'guides/applications/mathematica',
            'guides/software/dmtcp',
            'guides/software/squashfs',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        {
          type: 'category',
          label: 'Data Commons',
          items: [
            'resources/data-commons/requirements',
            'resources/data-commons/ego4d',
            'resources/data-commons/kitchens',
            'resources/data-commons/fineweb_edu',
            'resources/data-commons/imagenet',
            'resources/data-commons/kinetics',
            'resources/data-commons/olmo-mix-1124',
            'resources/data-commons/tablib',
            'resources/data-commons/tcga',
            'resources/data-commons/the_pile',
          ],
        },
        'resources/faq',
        'resources/glossary',
        {
          type: 'category',
          label: 'Contribution Guide',
          items: [
            'resources/contribution-guide/pull-request',
            'resources/contribution-guide/markdown-guide',
            'resources/contribution-guide/link-markdown',
            'resources/contribution-guide/mdx',
          ],
        },
      ],
    },
  ],
};
