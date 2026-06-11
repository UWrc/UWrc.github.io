module.exports = {
  title: 'Research Computing Documentation',
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
    announcementBar: {
      id: 'new_user_docs',
      content: '👋 New to Hyak? <a href="/docs">Start here</a> to find helpful resources before you start computing.',
      backgroundColor: '#4b2e83',
      textColor: '#ffffff',
      isCloseable: true,
    },
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
      title: 'Research Computing Documentation',
      logo: {
        alt: 'Hyak Logo',
        src: 'img/logos/W-Logo_Purple_RGB.png',
        srcDark: 'img/logos/W-Logo_White_RGB.png',
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
          to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035560',
          label: 'Pricing',
          position: 'right',
          items: [
            {
              label: 'Hyak Klone HPC',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035560',
            },
            {
              label: 'Tillicum GPU Cluster',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036077',
            },
            {
              label: 'Cloud Computing',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036116',
            },
            {
              label: 'Computing for Restricted Access',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035679',
            },
            {
              label: 'Kopah S3 Storage',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083',
            },
            {
              label: 'Lolo Data Archive',
              to: 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084',
            },
          ]
        },
        {
          to: 'docs',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          to: '/learn',
          label: 'Learn',
          position: 'right',
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
        /*{
          to: 'team',
          label: 'About',
          position: 'right',
          items: [
            
            //{
            //  label: 'Supporting You',
            //  to: '/about',
            //},
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
        },*/

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Research Computing',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Docs',
              to: '/docs',
            },
            {
              label: 'Free Student Hyak Account',
              href: 'https://depts.washington.edu/uwrcc/hyak_access/',
            },
            {
              label: 'Cloud Credits for Students',
              href: 'https://depts.washington.edu/uwrcc/cloud/',
            },
            {
              label: 'Research Computing Services',
              href: 'https://it.uw.edu/research',
            },
            {
              label: 'UWIT Home',
              href: 'https://it.uw.edu',
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
              label: 'Help Desk',
              href: 'https://it.uw.edu/help/uw/',
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
