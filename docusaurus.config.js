module.exports = {
  title: 'Hyak',
  tagline: 'Powering discoveries in every field',
  url: 'https://hyak.uw.edu',
  baseUrl: '/',
  favicon: 'img/logos/uw_icon.png',
  organizationName: 'UWrc', // Github org/user name
  projectName: 'UWrc.github.io', // repo name
  plugins: [
    [
      require.resolve('docusaurus-lunr-search'),
      {
        languages: ['en'],
        maxSearchResults: 10,
      },
    ],
  ],
  onBrokenLinks: 'ignore',
  themeConfig: {
    prism: {
      additionalLanguages: ['shell-session']
    },
    colorMode: {
      defaultMode: 'light', // "light" | "dark"
      disableSwitch: false, // Hides the switch in the navbar
    },
    docs: {
      sidebar: {
        hideable: true,
      }
    },
    navbar: {
      title: 'Research Computing',
      logo: {
        alt: 'Hyak Logo',
        src: 'img/logos/uw_icon.png',
      },
      items: [
        /*
        {
          to: '/',
          label: 'Home',
          position: 'right',
        },
        */
        {
          to: '/systems',
          label: 'Systems',
          position: 'right',
          items: [
            {
              label: 'Hyak',
              to: '/systems',
            },
            {
              label: 'Tillicum',
              to: '/tillicum'
            },
          ]
        },
        {
          to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035560',
          label: 'Pricing',
          position: 'right',
          items: [
            {
              label: 'Compute: Hyak Klone',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035560',
            },
            {
              label: 'Try Hyak Klone',
              to: 'https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=f5caba8fdbe108101ba12968489619e0',
            },
            {
              label: 'Research Storage',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035580',
            },
          ]
        },
        {
          to: 'docs',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'right',
        },
                {
          to: 'https://www.youtube.com/playlist?list=PL-uLiqrTav1omqc7omKsLzRg2ng3nKCtj',
          label: 'Training Videos',
          position: 'right',
          items: [
            {
              label: 'Short How-Tos',
              to: 'https://www.youtube.com/playlist?list=PL-uLiqrTav1qqP5bXbyd6dMNWnV35s9hg',
            },
            {
              label: 'Recording Training',
              to: 'https://www.youtube.com/playlist?list=PL-uLiqrTav1omqc7omKsLzRg2ng3nKCtj',
            },
          ]
        },
        {
          to: 'https://calendar.washington.edu/sea_uwit-rc',
          label: 'Events',
          position: 'right',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'right'
        },
        {
          to: 'team',
          label: 'About',
          position: 'right',
          items: [
            /*
            {
              label: 'Supporting You',
              to: '/about',
            },
            */
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
          title: 'Hyak',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Sign Up',
              to: 'https://uw.service-now.com/it?id=sc_entry&sys_id=bbcd76e1db12bb8037ae9ec6db961948&sysparm_category=d103f865dba2bf40d6a77a8eaf9619b2',
            },
            {
              label: 'Free Student Account',
              to: 'https://depts.washington.edu/uwrcc/hyak_access/',
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
              label: 'School of Medicine',
              href: 'https://www.uwmedicine.org/school-of-medicine',
            },
            {
              label: 'UW Bothell',
              href: 'https://www.uwb.edu/',
            },
            {
              label: 'UW Tacoma',
              href: 'https://www.tacoma.uw.edu/',
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
          sidebarCollapsible: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-EY203TR1HS',
          anonymizeIP: true,
        }
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
        {
          caption: 'OpenHPC',
          image: 'img/software/openhpc.svg',
        },
      ],
    }
  }
};
