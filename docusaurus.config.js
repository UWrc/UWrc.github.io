module.exports = {
  title: 'Hyak',
  tagline: 'Powering discoveries in every field',
  url: 'https://hyak.uw.edu',
  baseUrl: '/',
  favicon: 'img/logos/uw_icon.png',
  organizationName: 'UWrc', // Github org/user name
  projectName: 'UWrc.github.io', // repo name
  plugins: [require.resolve('docusaurus-lunr-search')],
  onBrokenLinks: 'ignore',
  themeConfig: {
    colorMode: {
      defaultMode: 'light', // "light" | "dark"
      disableSwitch: true, // Hides the switch in the navbar
    },
    navbar: {
      title: 'Research Computing',
      logo: {
        alt: 'Hyak Logo',
        src: 'img/logos/uw_icon.png',
      },
      items: [
        {
          to: 'hyak/',
          label: 'Hyak',
          position: 'right',
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'right',
        },
        {
          to: 'blog/', 
          label: 'Stories', 
          position: 'right'
        },
        {
          to: 'about/', 
          label: 'About', 
          position: 'right'
        },
        /*
        {
          href: 'https://github.com/UWrc',
          target: '_blank',
          label: 'Github',
          position: 'right',
        },
        */
      ],
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
    Graphics: {
      SPLASH_LOGO: 'img/logos/rcc.png',
      SplashArt: {
        LEFT: [
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
        RIGHT: [
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
      INTERFACES: [
        {
          caption: 'Terminal',
          image: 'img/interfaces/terminal.png',
        },
        {
          caption: 'VSCode',
          image: 'img/interfaces/vscode.svg',
        },
        {
          caption: 'Jupyter',
          image: 'img/interfaces/jupyter.svg',
        },
        {
          caption: 'RStudio',
          image: 'img/interfaces/rstudio.svg',
        },
      ],
      PROGRAMMING_LANGS: [
        {
          caption: 'C++',
          image: 'img/languages/cpp.svg',
        },
        {
          caption: 'Python',
          image: 'img/languages/python.svg',
        },
        {
          caption: 'R',
          image: 'img/languages/r.svg',
        },
      ],
      APP_STORE: [
        {
          caption: 'MATLAB',
          image: 'img/appstore/matlab.svg',
        },
        {
          caption: 'Anaconda',
          image: 'img/appstore/conda.svg',
        },
        {
          caption: 'Singularity',
          image: 'img/appstore/singularity.svg',
        },
        {
          caption: 'ML',
          image: 'img/appstore/mlsuite.png',
        },
      ],
      CONTACT: [
        {
          caption: 'Email',
          image: 'img/contact/email.svg',
          link: 'mailto:help@uw.edu?subject=Hyak question',
        },
        {
          caption: 'Zoom',
          image: 'img/contact/zoom.svg',
        },
        {
          caption: 'Slack',
          image: 'img/contact/slack.svg',
          link: 'https://uw-rcc.slack.com/',
        },
        {
          caption: 'UW eScience Institute',
          image: 'img/contact/escience.png',
          link: 'https://escience.washington.edu',
        },
      ],
      BUILT_WITH: [
        {
          caption: 'Ansible',
          image: 'img/software/ansible.svg',
        },
        {
          caption: 'Linux',
          image: 'img/software/linux.svg',
        },
        {
          caption: 'Kubernetes',
          image: 'img/software/kubernetes.svg',
        },
        {
          caption: 'Slurm',
          image: 'img/software/slurm.svg',
        },
      ],
      POWERED_BY: [
        {
          caption: 'Lenovo',
          image: 'img/hardware/lenovo.svg',
        },
        {
          caption: 'Intel',
          image: 'img/hardware/intel.svg',
        },
        {
          caption: 'NVIDIA',
          image: 'img/hardware/nvidia.svg',
        },
        {
          caption: 'Dell Technologies',
          image: 'img/hardware/dell.svg',
        },
      ]
    }
  }
};
