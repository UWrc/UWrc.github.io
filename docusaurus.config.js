module.exports = {
  title: 'HYAK',
  tagline: 'Powering discoveries in every field',
  url: 'https://hyak.uw.edu',
  baseUrl: '/',
  favicon: 'img/logos/uw_icon.png',
  organizationName: 'UWrc', // Github org/user name
  projectName: 'UWrc.github.io', // repo name
  plugins: [require.resolve('docusaurus-lunr-search')],
  onBrokenLinks: 'ignore',
  themeConfig: {
    sidebarCollapsible: true,
    hideableSidebar: true,
    prism: {
      additionalLanguages: ['shell-session']
    },
    colorMode: {
      defaultMode: 'light', // "light" | "dark"
      disableSwitch: false, // Hides the switch in the navbar
    },
    navbar: {
      title: 'Research Computing',
      logo: {
        alt: 'HYAK Logo',
        src: 'img/logos/uw_icon.png',
      },
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'right',
        },
        {
          to: '/systems',
          label: 'Systems',
          position: 'right',
        },
        {
          to: 'pricing',
          label: 'Pricing',
          position: 'right',
        },
        {
          to: 'docs',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'right',
        },
        {
          to: 'blog', 
          label: 'Stories', 
          position: 'right'
        },
        {
          to: 'about', 
          label: 'About', 
          position: 'right',
          items: [
            {
              label: 'Supporting You',
              to: '/about',
            },
            {
              label: 'Our Team',
              to: '/team',
            },
            {
              label: 'Governance Board',
              to: '/board',
            },
            {
              label: 'Publications',
              to: '/publications',
            },
          ]
        },

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'HYAK',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Sign Up',
              to: '/sign-up',
            },
            {
              label: 'Documentation',
              to: '/docs',
            },
            {
              label: 'About',
              to: '/about',
            },
          ],
        },
        {
          title: 'Sponsors',
          items: [
            {
              label: 'College of Arts & Sciences',
              href: 'https://artsci.washington.edu',
            },
            {
              label: 'College of Engineering',
              href: 'https://www.engr.washington.edu',
            },
            {
              label: 'College of the Environment',
              href: 'https://environment.uw.edu',
            },
            {
              label: 'Institute for Protein Design',
              href: 'https://www.ipd.uw.edu',
            },
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'E-mail',
              href: 'mailto:help@uw.edu?subject=hyak help footer',
            },
            {
              label: 'Mailing List',
              href: 'https://mailman1.u.washington.edu/mailman/listinfo/hyak-users',
            },
            {
              label: 'Slack',
              href: 'https://uw-hpcc.slack.com'
            },
            {
              label: 'Github',
              href: 'https://github.com/uwrc',
            },
          ],
        },
      ],
      copyright: `Made with ❤️ in Seattle`,
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
      SPLASH_LOGOS: [
        {
          link: 'https://github.com/UWrc',
          caption: 'UWrc Github',
          image: 'img/splashlogos/github.svg'
        }
      ],
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
