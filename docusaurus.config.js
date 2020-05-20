module.exports = {
  title: 'HYAK',
  tagline: 'Powering discoveries in every field',
  url: 'https://hyak.uw.edu',
  baseUrl: '/',
  favicon: 'img/logos/uw_icon.png',
  organizationName: 'UWrc', // Usually your GitHub org/user name.
  projectName: 'UWrc.github.io', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: 'Research Computing',
      logo: {
        alt: 'Hyak Logo',
        src: 'img/logos/uw_icon.png',
      },
      links: [
        {
          to: 'docs/markdown-guide',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'right',
        },
        {to: 'blog', label: 'Blog', position: 'right'},
        {to: 'about', label: 'About', position: 'right'},
        {
          href: 'https://github.com/UWrc',
          target: '_blank',
          label: 'GitHub',
          position: 'right',
        },
      ],
      hideOnScroll: true
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Markdown Guide',
              to: 'docs/markdown-guide',
            },
            {
              label: 'Link Markdown to Site',
              to: 'docs/link-markdown',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'UW RCC',
              href: 'https://depts.washington.edu/uwrcc/',
            },
            {
              label: 'Slack',
              href: 'https://uw-rcc.slack.com/',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'UW RCC GitHub',
              href: 'https://github.com/uwrc',
            },
            {
              label: 'UW HPCC GitHub',
              href: 'https://github.com/UW-HPC'
            },
            {
              label: 'Mailing List',
              href: 'http://mailman12.u.washington.edu/mailman/listinfo/hpc-list'
            }
          ],
        },
      ],
      //copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  customFields: {
    splashLogo: 'img/logos/hyak.png',
    splashArt: {
      left: [
        {
          caption: 'Medicine',
          image: 'img/splashart/medicine.svg',
          darkImage: 'img/splashart/medicine_white.svg'
        },
        {
          caption: 'Data',
          image: 'img/splashart/data_uw_gold.svg',
          darkImage: 'img/splashart/data_white.svg'
        },
        {
          caption: 'Engineer',
          image: 'img/splashart/engineer.svg',
          darkImage: 'img/splashart/engineer_white.svg'
        }
      ],
      right: [
        {
          caption: 'Rocket',
          image: 'img/splashart/rocket.svg',
          darkImage: 'img/splashart/rocket_white.svg'
        },
        {
          caption: 'Programming',
          image: 'img/splashart/programmer_uw_gold.svg',
          darkImage: 'img/splashart/programmer_white.svg'
        },
        {
          caption: 'Chemistry',
          image: 'img/splashart/test_tubes.svg',
          darkImage: 'img/splashart/test_tubes_white.svg'
        },
      ]
    },
    interfaces: [
      {
        caption: 'Terminal',
        image: 'img/interfaces/terminal.png',
      },
      {
        caption: 'Microsoft VSCode',
        image: 'img/interfaces/vscode.svg',
      },
      {
        caption: 'Project Jupyter',
        image: 'img/interfaces/jupyter.png',
      },
      {
        caption: 'RStudio',
        image: 'img/interfaces/rstudioball.png',
      },
      {
        caption: 'XFCE',
        image: 'img/interfaces/xfce.svg',
      },
      {
        caption: 'Emacs',
        image: 'img/interfaces/emacs.png',
      },
      {
        caption: 'Vim',
        image: 'img/interfaces/vim.png',
      },
    ],
    progLangs: [
      {
        caption: 'C++',
        image: 'img/proglangs/cpp.png',
      },
      {
        caption: 'Python',
        image: 'img/proglangs/python.svg',
      },
      {
        caption: 'R',
        image: 'img/proglangs/r.png',
      },
      {
        caption: 'Julia',
        image: 'img/proglangs/julia.png',
      },
    ],
    appStore: [
      {
        caption: 'MATLAB',
        image: 'img/appstore/matlab.png',
      },
      {
        caption: 'Anaconda',
        image: 'img/appstore/anaconda.png',
      },
      {
        caption: 'Singularity',
        image: 'img/appstore/singularity.png',
      },
      {
        caption: 'Python ML Libraries',
        image: 'img/appstore/pymlsuite.png',
      },
    ],
    contact: [
      {
        caption: 'Email',
        image: 'img/contact/email.png',
        link: 'mailto:help@uw.edu?subject=Hyak question',
      },
      {
        caption: 'Slack',
        image: 'img/contact/slack.png',
        link: 'https://uw-rcc.slack.com/',
      },
      {
        caption: 'UW eScience Institute',
        image: 'img/contact/escience.png',
        link: 'https://escience.washington.edu',
      },
    ],
    builtWith: [
      {
        caption: 'Ansible',
        image: 'img/builtwith/ansible.svg',
      },
      {
        caption: 'Linux',
        image: 'img/builtwith/linux.png',
      },
      {
        caption: 'Docker',
        image: 'img/builtwith/docker.png',
      },
      {
        caption: 'Kubernetes',
        image: 'img/builtwith/kubernetes.svg',
      },
      {
        caption: 'Slurm',
        image: 'img/builtwith/slurm.png',
      },
    ],
    poweredBy: [
      {
        caption: 'Lenovo',
        image: 'img/poweredby/lenovo.png',
      },
      {
        caption: 'Intel',
        image: 'img/poweredby/intel.svg',
      },
      {
        caption: 'Nvidia',
        image: 'img/poweredby/nvidia.svg',
      },
      {
        caption: 'Dell EMC',
        image: 'img/poweredby/dell_emc.png',
      },
    ]
  }
};
