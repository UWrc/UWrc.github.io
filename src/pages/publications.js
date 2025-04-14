import React from 'react';
import Layout from '@theme/Layout';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function Publications() {
  return (
<Layout title="Publications">
  <div class="container">
    <div class="row">        
      <h1>Publications</h1>
      <p>
      Conference papers, peer-reviewed journal articles, and other scholarly works are the result of your hard work of which Hyak was one helping hand. Please consider citing or acknowleding Hyak in your final work and then let us know so it can be considered to appear in our select publication list.
      </p>

      <pre>
        The Hyak Consortium. "Title TBD." arXiv:4444.55555 (2021)
      </pre>
      
      <pre>

      </pre>
    </div>
  </div>
  
  <div class="container">
    <div class="row">
      <h3>Select Publications</h3>
      <p>
      These are select works that were produced using a Hyak cluster in any given year. While hundreds of papers are produced each year using Hyak, we limit the select list below to 10 for the sake of brevity. If you would like your publication to be considered for inclusion onto this list please <a href="mailto:help@uw.edu?subject=Hyak publication">e-mail us</a> with the citation.
      </p>
    </div>
    
    <div class="row">
      <Tabs
        className="unique-tabs"
        defaultValue="2024"
        values={[
          {label: '2024', value: '2024'},
          {label: '2023', value: '2023'},
          {label: '2022', value: '2022'},
          {label: '2021', value: '2021'},
          {label: '2020', value: '2020'},
          {label: '2019', value: '2019'},
        ]}>
        <TabItem value="2024">

        <h4>Aeronautics and Astronautics</h4>
          <ol>
            <li>Three-Dimensionality of Vertical Axis Cross-Flow Turbine Flow in High Confinement - ProQuest. https://www.proquest.com/docview/3081569739?pq-origsite=gscholar&fromopenview=true&sourcetype=Dissertations%20&%20Theses (accessed 2024-11-07).</li>
            <li>Spencer, F.; Nino, G.; Wai, J.; Wai, J. M.; Breidenthal, R. Mixing in a Novel Rocket Engine. In AIAA SCITECH 2024 Forum; AIAA SciTech Forum; American Institute of Aeronautics and Astronautics, 2024. DOI: https://doi.org/10.2514/6.2024-0346.</li>
            <li>Spalart, P. R.; Dodd, M. S. Theory and Simulations of Confined Periodic Turbulence. Journal of Turbulence 2024, 25 (4–6), 145–156. DOI: https://doi.org/10.1080/14685248.2024.2342265.</li>
          </ol>
        <h4>Bioengineering</h4>
          <ol>

            <li>Bifulco, S. F.; Macheret, F.; Scott, G. D.; Akoum, N.; Boyle, P. M. Explainable Machine Learning to Predict Anchored Reentry Substrate Created by Persistent Atrial Fibrillation Ablation in Computational Models. Journal of the American Heart Association 2023, 12 (16), e030500. DOI: https://doi.org/10.1161/JAHA.123.030500.</li>
            <li>Gibbs, C. E.; Boyle, P. M. Population-Based Computational Simulations Elucidate Mechanisms of Focal Arrhythmia Following Stem Cell Injection Chelsea E Gibbs and Patrick M Boyle. Social Science Research Network: Rochester, NY October 8, 2024. DOI: https://doi.org/10.2139/ssrn.4968992.</li>
          </ol>
        <h4>Biology</h4>
          <ol>
            <li>Wang, B.; Torok, Z.; Duffy, A.; Bell, D. G.; Wongso, S.; Velho, T. A. F.; Fairhall, A. L.; Lois, C. Unsupervised Restoration of a Complex Learned Behavior after Large-Scale Neuronal Perturbation. Nat Neurosci 2024, 27 (6), 1176–1186. DOI: https://doi.org/10.1038/s41593-024-01630-6.</li>
            <li>Broshkevitch CJ, Barnabas RV, Liu G, Palanee-Phillips T, Rao DW (2024) Enhanced cervical cancer and HIV interventions reduce the disproportionate burden of cervical cancer cases among women living with HIV: A modeling analysis. PLoS ONE 19(5): e0301997. DOI: https://doi.org/10.1371/journal.pone.0301997</li>
            <li>Jin, K.; McCoy, B. M.; Goldman, E. A.; Usova, V.; Tkachev, V.; Chitsazan, A. D.; Kakebeen, A.; Jeffery, U.; Creevy, K. E.; Wills, A.; Snyder-Mackler, N.; Promislow, D. E. L. DNA Methylation and Chromatin Accessibility Predict Age in the Domestic Dog. Aging Cell 2024, 23 (4), e14079. DOI: https://doi.org/10.1111/acel.14079.</li>

          </ol>
        <h4>Chemical Engineering</h4>
          <ol>
            <li>Sanghavi, R.; Intan, N. N.; Xie, S.; Lin, H.; Pfaendtner, J. Reaction Pathway Analysis of PET Deconstruction via Methanolysis and Tertiary Amine Catalysts. J. Phys. Chem. A 2024, 128 (29), 5883–5891. DOI: https://doi.org/10.1021/acs.jpca.4c02276.</li>
            <li>Qi, X.; Pfaendtner, J. High-Throughput Computational Screening of Solid-Binding Peptides. J. Chem. Theory Comput. 2024, 20 (7), 2959–2968. DOI: https://doi.org/10.1021/acs.jctc.3c01286.</li>
            <li>Mao, C. M.; Sampath, J.; Pfaendtner, J. Molecular Driving Forces in the Self-Association of Silaffin Peptide R5 from MD Simulations. ChemBioChem 2024, 25 (11), e202300788. DOI: https://doi.org/10.1002/cbic.202300788.</li>
            <li>Torkelson, K.; Naser, N. Y.; Qi, X.; Li, Z.; Yang, W.; Pushpavanam, K.; Chen, C.-L.; Baneyx, F.; Pfaendtner, J. Rational Design of Novel Biomimetic Sequence-Defined Polymers for Mineralization Applications. Chem. Mater. 2024, 36 (2), 786–794. DOI: https://doi.org/10.1021/acs.chemmater.3c02216.</li>
            <li>K. Tran, D.; M. West, S.; K. Speck, E. M.; A. Jenekhe, S. Observation of Super-Nernstian Proton-Coupled Electron Transfer and Elucidation of Nature of Charge Carriers in a Multiredox Conjugated Polymer. Chemical Science 2024, 15 (20), 7623–7642. DOI: https://doi.org/10.1039/D4SC00785A.</li>

          </ol>
        <h4>Chemistry</h4>
          <ol>
            <li>Kovtun, M.; Lambros, E.; Liu, A.; Tang, D.; Williams-Young, D. B.; Li, X. Accelerating Relativistic Exact-Two-Component Density Functional Theory Calculations with Graphical Processing Units. J. Chem. Theory Comput. 2024, 20 (18), 7694–7699. DOI: https://doi.org/10.1021/acs.jctc.4c00843.</li>
            <li>Infrared spectroscopy of the syn-methyl-substituted Criegee intermediate: A combined experimental and theoretical study | The Journal of Chemical Physics | AIP Publishing. https://pubs.aip.org/aip/jcp/article-abstract/160/20/204309/3295490/Infrared-spectroscopy-of-the-syn-methyl?redirectedFrom=fulltext</li>
            <li>Sandeno, S. F.; Schnitzenbaumer, K. J.; Krajewski, S. M.; Beck, R. A.; Ladd, D. M.; Levine, K. R.; Dayton, D.; Toney, M. F.; Kaminsky, W.; Li, X.; Cossairt, B. M. Ligand Steric Profile Tunes the Reactivity of Indium Phosphide Clusters. J. Am. Chem. Soc. 2024, 146 (5), 3102–3113. DOI: https://doi.org/10.1021/jacs.3c10203.</li>
            <li>Okura, Y.; Santis, G. D.; Hirata, K.; Melissas, V. S.; Ishiuchi, S.; Fujii, M.; Xantheas, S. S. Switching of Protonation Sites in Hydrated Nicotine via a Grotthuss Mechanism. J. Am. Chem. Soc. 2024, 146 (5), 3023–3030. DOI: https://doi.org/10.1021/jacs.3c08922.</li>
            <li>Sandeno, S. F.; Krajewski, S. M.; Beck, R. A.; Kaminsky, W.; Li, X.; Cossairt, B. M. Synthesis and Single Crystal X-Ray Diffraction Structure of an Indium Arsenide Nanocluster. ACS Cent. Sci. 2024, 10 (3), 744–751. DOI: https://doi.org/10.1021/acscentsci.3c01451.</li>
            <li>Okura, Y.; Santis, G. D.; Hirata, K.; Xantheas, S. S.; Fujii, M.; Ishiuchi, S.-I. The Gas Phase Protonation Sites of Six Naturally Occurring Nicotinoids. J. Phys. Chem. Lett. 2024, 15 (27), 6966–6973. DOI: https://doi.org/10.1021/acs.jpclett.4c01206.</li>
            <li>Li, S.; Lu, L.; Bhattacharyya, S.; Pearce, C.; Li, K.; Nienhuis, E. T.; Doumy, G.; Schaller, R. D.; Moeller, S.; Lin, M.-F.; Dakovski, G.; Hoffman, D. J.; Garratt, D.; Larsen, K. A.; Koralek, J. D.; Hampton, C. Y.; Cesar, D.; Duris, J.; Zhang, Z.; Sudar, N.; Cryan, J. P.; Marinelli, A.; Li, X.; Inhester, L.; Santra, R.; Young, L. Attosecond-Pump Attosecond-Probe x-Ray Spectroscopy of Liquid Water. Science 2024, 383 (6687), 1118–1122. DOI: https://doi.org/10.1126/science.adn6059.</li>
            <li>Salveson, P. J.; Moyer, A. P.; Said, M. Y.; Gӧkçe, G.; Li, X.; Kang, A.; Nguyen, H.; Bera, A. K.; Levine, P. M.; Bhardwaj, G.; Baker, D. Expansive Discovery of Chemically Diverse Structured Macrocyclic Oligoamides. Science 2024, 384 (6694), 420–428. DOI: https://doi.org/10.1126/science.adk1687.</li>
            <li>Geary, J.; Aalto, J. P.; Xiao, D. J. Modular Synthesis of Templated Bimetallic Sites in Metal–Organic Framework Pores. Chem. Mater. 2024, 36 (8), 3949–3956. DOI: https://doi.org/10.1021/acs.chemmater.4c00500.</li>
            <li>Ehrman, J. N.; Shumilov, K.; Jenkins, A. J.; Kasper, J. M.; Vitova, T.; Batista, E. R.; Yang, P.; Li, X. Unveiling Hidden Shake-Up Features in the Uranyl M4-Edge Spectrum. JACS Au 2024, 4 (3), 1134–1141. DOI: https://doi.org/10.1021/jacsau.3c00838.</li>
          </ol>
        <h4>Computer Science</h4>
          <ol>
            <li>Champion, K. Social and Technical Sources of Risk in Sustaining Digital Infrastructure. Ph.D., University of Washington, United States -- Washington, 2024. https://www.proquest.com/docview/3106218896/abstract/919D99C527294ED4PQ/1</li>
            <li>Slaughter, I.; Brown, E. M.; Weber, N. The Impact of iBuying Is About More Than Just Racial Disparities: Evidence from Mecklenburg County, NC. In Proceedings of the 2024 ACM Conference on Fairness, Accountability, and Transparency; FAccT ’24; Association for Computing Machinery: New York, NY, USA, 2024; pp 2086–2100. DOI: https://doi.org/10.1145/3630106.3659027.</li>
            <li>Gardner, J.; Perdomo, J. C.; Schmidt, L. Large Scale Transfer Learning for Tabular Data via Language Modeling. arXiv June 17, 2024. DOI: https://doi.org/10.48550/arXiv.2406.12031.</li>

          </ol>
        <h4>Environmental Science</h4>
          <ol>
            <li>K. C., P. Developing a Framework for Studying Fine Resolution Impacts of Climate Change on Forest Ecosystems at Regional Scale Using Remote Sensing and Artificial Intelligence. Ph.D., University of Washington, United States -- Washington, 2024. https://www.proquest.com/docview/3105592000/abstract/CB91EFDB2214537PQ/1</li>
            <li>Khatri-Chhetri, P.; van Wagtendonk, L.; Hendryx, S. M.; Kane, V. R. Enhancing Individual Tree Mortality Mapping: The Impact of Models, Data Modalities, and Classification Taxonomy. Remote Sensing of Environment 2024, 300, 113914. DOI: https://doi.org/10.1016/j.rse.2023.113914.</li>
          </ol>
        <h4>Materials Science and Engineering</h4>
          <ol>
            <li>Salguero, O.; Kim, J. R.; Beckert, A.; Lim, M.; Zhang, S.; Ping, Y.; Faraon, A.; Falson, J.; Idrobo, J. C. Towards Atomic Imaging and Spectroscopy of Er Defects in ZnO. Microscopy and Microanalysis 2024, 30 (Supplement_1), ozae044.775. DOI: https://doi.org/10.1093/mam/ozae044.775.</li>
            <li>Zhang, X.-W.; Wang, C.; Liu, X.; Fan, Y.; Cao, T.; Xiao, D. Polarization-Driven Band Topology Evolution in Twisted MoTe2 and WSe2. Nat Commun 2024, 15 (1), 4223. DOI: https://doi.org/10.1038/s41467-024-48511-x.</li>
            <li>Demir, B.; Akin Gultakti, C.; Koker, Z.; Anantram, M. P.; Oren, E. E. Electronic Properties of DNA Origami Nanostructures Revealed by In Silico Calculations. J. Phys. Chem. B 2024, 128 (19), 4646–4654. DOI: https://doi.org/10.1021/acs.jpcb.4c00445.</li>
              
          </ol>
        <h4>Mathematics</h4>
          <ol>
            <li>Nicolaou, Z. G.; Bramburger, J. J. Complex Localization Mechanisms in Networks of Coupled Oscillators: Two Case Studies. Chaos: An Interdisciplinary Journal of Nonlinear Science 2024, 34 (1), 013131. DOI: https://doi.org/10.1063/5.0174550.</li>
          </ol>
        <h4>Mechanical Engineering</h4>
          <ol>
          <li>Novokhodko, A.; Du, N.; Hao, S.; Wang, Z.; Shu, Z.; Ahmad, S.; Gao, D. Predicting the Impact of Dialyzer Choice and Binder Dialysate Flow Rate on Bilirubin Removal. bioRxiv September 30, 2024, p 2024.09.27.615470. DOI: https://doi.org/10.1101/2024.09.27.615470.</li>
          <li>Straccia, A.; Barbour, M. C.; Chassagne, F.; Bass, D.; Barros, G.; Leotta, D.; Sheehan, F.; Sharma, D.; Levitt, M. R.; Aliseda, A. Numerical Modeling of Flow in the Cerebral Vasculature: Understanding Changes in Collateral Flow Directions in the Circle of Willis for a Cohort of Vasospasm Patients Through Image-Based Computational Fluid Dynamics. Ann Biomed Eng 2024, 52 (9), 2417–2439. DOI: https://doi.org/10.1007/s10439-024-03533-w.</li>
          </ol>
        <h4>Physics</h4>
          <ol>
            <li>Nicolaou, Z. G.; Bramburger, J. J. Complex Localization Mechanisms in Networks of Coupled Oscillators: Two Case Studies. Chaos: An Interdisciplinary Journal of Nonlinear Science 2024, 34 (1), 013131. DOI: https://doi.org/10.1063/5.0174550.</li>
            <li>Raval, V. M.; Manookin, M. B.; Rieke, F. Testing and Optimizing RGC Type Selective Stimuli. Investigative Ophthalmology & Visual Science 2024, 65 (7), 2468.</li>
            <li>Borisiak, K.; Visani, G. M.; Nourmohammad, A. Loop-Diffusion: An Equivariant Diffusion Model for Designing and Scoring Protein Loops. arXiv September 26, 2024. DOI: https://doi.org/10.48550/arXiv.2409.18201.</li>
            <li>Visani, G. M.; Pun, M. N.; Galvin, W.; Daniel, E.; Borisiak, K.; Wagura, U.; Nourmohammad, A. HERMES: Holographic Equivariant neuRal Network Model for Mutational Effect and Stability Prediction. arXiv July 9, 2024. DOI: https://doi.org/10.48550/arXiv.2407.06703.</li>
            <li>Pun, M. N.; Ivanov, A.; Bellamy, Q.; Montague, Z.; LaMont, C.; Bradley, P.; Otwinowski, J.; Nourmohammad, A. Learning the Shape of Protein Microenvironments with a Holographic Convolutional Neural Network. Proceedings of the National Academy of Sciences 2024, 121 (6), e2300838121. DOI: https://doi.org/10.1073/pnas.2300838121.</li>
            <li>Zemlevskiy, N. A. Scalable Quantum Simulations of Scattering in Scalar Field Theory on 120 Qubits. arXiv November 4, 2024. DOI: https://doi.org/10.48550/arXiv.2411.02486.</li>
            <li>Froland, H.; Zache, T. V.; Ott, R.; Mueller, N. Entanglement Structure of Non-Gaussian States and How to Measure It. arXiv July 16, 2024. DOI: https://doi.org/10.48550/arXiv.2407.12083.</li>
            <li>Farrell, R. C.; Illa, M.; Ciavarella, A. N.; Savage, M. J. Scalable Circuits for Preparing Ground States on Digital Quantum Computers: The Schwinger Model Vacuum on 100 Qubits. PRX Quantum 2024, 5 (2), 020315. DOI: https://doi.org/10.1103/PRXQuantum.5.020315.</li>
            <li>Turro, F.; Wendt, K. A.; Quaglioni, S.; Pederiva, F.; Roggero, A. Evaluation of Phase Shifts for Nonrelativistic Elastic Scattering Using Quantum Computers. Phys. Rev. C 2024, 110 (5), 054604. DOI: https://doi.org/10.1103/PhysRevC.110.054604.</li>
            <li>Bhaskar, R.; Roggero, A.; Savage, M. J. Timescales in Many-Body Fast-Neutrino-Flavor Conversion. Phys. Rev. C 2024, 110 (4), 045801. DOI: https://doi.org/10.1103/PhysRevC.110.045801.</li>

            </ol>
          
          



        </TabItem>

        <TabItem value="2023">
          <h4>Chemical Engineering</h4>
          <ol>
            <li>Komp, E., Alanzi, H.N., Francis, R. et al. Author Correction: Homologous Pairs of Low and High Temperature Originating Proteins Spanning the Known Prokaryotic Universe. Sci Data 10, 750 (2023). DOI: https://doi.org/10.1038/s41597-023-02685-z</li>
            <li>Dollar, O.; Joshi, N.; Pfaendtner, J.; Beck, D. A. C. Efficient 3D Molecular Design with an E(3) Invariant Transformer VAE. J. Phys. Chem. A 2023, 127 (37), 7844–7852. DOI: https://doi.org/10.1021/acs.jpca.3c04188.</li>
            <li>Lachowski, K. J.; Chiang, H. T.; Torkelson, K.; Zhou, W.; Zhang, S.; Pfaendtner, J.; Pozzo, L. D. Anisotropic Gold Nanomaterial Synthesis Using Peptide Facet Specificity and Timed Intervention. Langmuir 2023, 39 (45), 15878–15888. DOI: https://doi.org/10.1021/acs.langmuir.3c01577.</li>
            <li>Vaddi, K.; Li, K.; D. Pozzo, L. Metric Geometry Tools for Automatic Structure Phase Map Generation. Digital Discovery 2023, 2 (5), 1471–1483. DOI: https://doi.org/10.1039/D3DD00105A.</li>
            <li>Alamdari, S.; Torkelson, K.; Wang, X.; Chen, C.-L.; Ferguson, A. L.; Pfaendtner, J. Thermodynamic Basis for the Stabilization of Helical Peptoids by Chiral Sidechains. J. Phys. Chem. B 2023, 127 (27), 6171–6183. DOI: https://doi.org/10.1021/acs.jpcb.3c01913.</li>
          </ol>
          <h4>Chemistry</h4>
          <ol>
            <li>Leshchev, D.; J. S. Valentine, A.; Kim, P.; Mills, A. W.; Roy, S.; Chakraborty, A.; Biasin, E.; Haldrup, K.; Hsu, D. J.; Kirschner, M. S.; Rimmerman, D.; Chollet, M.; Glownia, J. M.; van Driel, T. B.; Castellano, F. N.; Li, X.; Chen, L. X. Revealing Excited-State Trajectories on Potential Energy Surfaces with Atomic Resolution in Real Time. Angewandte Chemie International Edition 2023, 62 (28), e202304615. DOI: https://doi.org/10.1002/anie.202304615.</li>
            <li>Liu, A.; Zhang, T.; Hammes-Schiffer, S.; Li, X. Multicomponent Cholesky Decomposition: Application to Nuclear–Electronic Orbital Theory. J. Chem. Theory Comput. 2023, 19 (18), 6255–6262. https://doi.org/10.1021/acs.jctc.3c00686.</li>
            <li>Finney, J. M.; Choi, T. H.; Huchmala, R. M.; Heindel, J. P.; Xantheas, S. S.; Jordan, K. D.; McCoy, A. B. Isotope Effects in the Zundel–Eigen Isomerization of H+(H2O)6. J. Phys. Chem. Lett. 2023, 14 (20), 4666–4672. DOI: https://doi.org/10.1021/acs.jpclett.3c00952.</li>
            <li>A. Kamin, A.; D. Clayton, T.; E. Otteson, C.; M. Gannon, P.; Krajewski, S.; Kaminsky, W.; Jasti, R.; J. Xiao, D. Synthesis and Metalation of Polycatechol Nanohoops Derived from Fluorocycloparaphenylenes. Chemical Science 2023, 14 (36), 9724–9732. DOI: https://doi.org/10.1039/D3SC03561A.</li>
            <li>Ehrman, J.; Martinez-Baez, E.; Jenkins, A. J.; Li, X. Improving One-Electron Exact-Two-Component Relativistic Methods with the Dirac–Coulomb–Breit-Parameterized Effective Spin–Orbit Coupling. J. Chem. Theory Comput. 2023, 19 (17), 5785–5790. DOI: https://doi.org/10.1021/acs.jctc.3c00479.</li>
            <li>Liao, C.; Lambros, E.; Sun, Q.; Dyall, K. G.; Li, X. Exploring Locality in Molecular Dirac-Coulomb-Breit Calculations: A Perspective. J. Chem. Theory Comput. 2023, 19 (24), 9009–9017. DOI: https://doi.org/10.1021/acs.jctc.3c01012.</li>
            <li>Liu, X.; Hayes, D.; Chen, L. X.; Li, X. Bridge-Mediated Metal-to-Metal Electron and Hole Transfer in a Supermolecular Dinuclear Complex: A Computational Study Using Quantum Electron–Nuclear Dynamics. J. Phys. Chem. A 2023, 127 (8), 1831–1838. DOI: https://doi.org/10.1021/acs.jpca.2c07870.</li>
            <li>Eagle, F. W.; Harvey, S.; Beck, R.; Li, X.; Gamelin, D. R.; Cossairt, B. M. Enhanced Charge Transfer from Coinage Metal Doped InP Quantum Dots. ACS Nanosci. Au 2023, 3 (6), 451–461. DOI: https://doi.org/10.1021/acsnanoscienceau.3c00029.</li>
            <li>Park, N.; Beck, R. A.; Hoang, K. K.; Ladd, D. M.; Abramson, J. E.; Rivera-Maldonado, R. A.; Nguyen, H. A.; Monahan, M.; Seidler, G. T.; Toney, M. F.; Li, X.; Cossairt, B. M. Colloidal, Room-Temperature Growth of Metal Oxide Shells on InP Quantum Dots. Inorg. Chem. 2023, 62 (17), 6674–6687. DOI: https://doi.org/10.1021/acs.inorgchem.3c00161.</li>

          </ol>

         <h4>Computer Science</h4>
          <ol>
            <li>Slaughter, I.; Greenberg, C.; Schwartz, R.; Caliskan, A. Pre-Trained Speech Processing Models Contain Human-Like Biases That Propagate to Speech Emotion Recognition. In Findings of the Association for Computational Linguistics: EMNLP 2023; Bouamor, H., Pino, J., Bali, K., Eds.; Association for Computational Linguistics: Singapore, 2023; pp 8967–8989. DOI: https://doi.org/10.18653/v1/2023.findings-emnlp.602.</li>
            <li>De, A.; Mohammad, H.; Wang, Y.; Kubendran, R.; Das, A. K.; Anantram, M. P. Performance Analysis of DNA Crossbar Arrays for High-Density Memory Storage Applications. Sci Rep 2023, 13 (1), 6650. DOI: https://doi.org/10.1038/s41598-023-33004-6.</li>
          </ol>
         <h4>Neurology</h4>
          <ol>
            <li>Prater, K. E.; Green, K. J.; Mamde, S.; Sun, W.; Cochoit, A.; Smith, C. L.; Chiou, K. L.; Heath, L.; Rose, S. E.; Wiley, J.; Keene, C. D.; Kwon, R. Y.; Snyder-Mackler, N.; Blue, E. E.; Logsdon, B.; Young, J. E.; Shojaie, A.; Garden, G. A.; Jayadev, S. Human Microglia Show Unique Transcriptional Changes in Alzheimer’s Disease. Nat Aging 2023, 3 (7), 894–907. DOI: https://doi.org/10.1038/s43587-023-00424-y.</li>
          </ol>
        <h4>Materials Science and Engineering</h4>
          <ol>

            <li>Xie, K.; Zhang, X.-W.; Xiao, D.; Cao, T. Engineering Magnetic Phases of Layered Antiferromagnets by Interfacial Charge Transfer. ACS Nano 2023, 17 (22), 22684–22690. DOI: https://doi.org/10.1021/acsnano.3c07125.</li>
            <li>Ye, Y.; Qian, J.; Zhang, X.-W.; Wang, C.; Xiao, D.; Cao, T. Kekulé Moiré Superlattices. Nano Lett. 2023, 23 (14), 6536–6543. DOI: https://doi.org/10.1021/acs.nanolett.3c01550.</li>
          </ol>
          <h4>Physics</h4>

          <ol>
            <li>Ciavarella, A. Quantum Simulation of Quantum Field Theories. Ph.D., University of Washington, United States, Washington, 2023. https://www.proquest.com/docview/2864101871/abstract/705F119F746948E7PQ/1</li>
            <li>Ciavarella, A. N.; Caspar, S.; Singh, H.; Savage, M. J.; Lougovski, P. Simulating Heisenberg Interactions in the Ising Model with Strong Drive Fields. Phys. Rev. A 2023, 108 (4), 042216. DOI: https://doi.org/10.1103/PhysRevA.108.042216.</li>
            <li>Merritt, J.; Fidkowski, L. Entanglement Transitions with Free Fermions. Phys. Rev. B 2023, 107 (6), 064303. DOI: https://doi.org/10.1103/PhysRevB.107.064303.</li>
            <li>Yao, X. SU(2) Gauge Theory in $2+1$ Dimensions on a Plaquette Chain Obeys the Eigenstate Thermalization Hypothesis. Phys. Rev. D 2023, 108 (3), L031504. DOI: https://doi.org/10.1103/PhysRevD.108.L031504.</li>
            <li>Fernando, T.; Cao, T. Quantized Interband Topological Index in Two-Dimensional Systems. Phys. Rev. B 2023, 108 (8), L081111. DOI: https://doi.org/10.1103/PhysRevB.108.L081111.</li>
            <li>Farrell, R. C.; Chernyshev, I. A.; Powell, S. J. M.; Zemlevskiy, N. A.; Illa, M.; Savage, M. J. Preparations for Quantum Simulations of Quantum Chromodynamics in $1+1$ Dimensions. I. Axial Gauge. Phys. Rev. D 2023, 107 (5), 054512. DOI: https://doi.org/10.1103/PhysRevD.107.054512.</li>


          </ol>
         
          
          



        </TabItem>
        <TabItem value="2022">
          <h4>Aeronautics and Astronautics</h4>
          <ol>
            <li>Hu, J. A.; Rawls, M. L.; Yoachim, P.; Ivezić, Ž. Satellite Constellation Avoidance with the Rubin Observatory Legacy Survey of Space and Time. ApJL 2022, 941 (1), L15. DOI: https://doi.org/10.3847/2041-8213/aca592 </li>
            <li>Haqq-Misra, J.; Kopparapu, R.; Fauchez, T. J.; Frank, A.; Wright, J. T.; Lingam, M. Detectability of Chlorofluorocarbons in the Atmospheres of Habitable M-Dwarf Planets. Planet. Sci. J. 2022, 3 (3), 60. DOI: https://doi.org/10.3847/PSJ/ac5404 </li>
            <li>Aithal, A. B. Direct Numerical Simulation of a Spatially Developing Turbulent Boundary Layer Separating over a Curved Wall. Ph.D., University of Washington, United States -- Washington, 2022. https://www.proquest.com/docview/2730286582/abstract/CD2A0E475AB1463FPQ/1 </li>
            <li>Wai, J. C. Reducing Fuel Evaporation Using Floating Objects. Ph.D., University of Washington, United States -- Washington, 2022. https://www.proquest.com/docview/2726392471/abstract/4BFC927229DD4441PQ/1 </li>
            <li>Moeyens, J. The Characterization and Discovery of Solar System Small Bodies in Modern Astronomical Surveys. Ph.D., University of Washington, United States -- Washington, 2022. https://www.proquest.com/docview/2769190498/abstract/4B499FC1CF704258PQ/1</li>
            <li>Huang, S.-C. (黃紹齊); Aithal, A. B.; Ferrante, A. Law of Incipient Separation for Turbulent Flows over Airfoils as Inferred by Reynolds-Averaged Navier–Stokes. Physics of Fluids 2022, 34 (8), 085117. DOI: https://doi.org/10.1063/5.0099523.</li>


          </ol>

          <h4>Chemical Engineering</h4>
          <ol>
            <li>Komp, E.; Valleau, S. Low-Cost Prediction of Molecular and Transition State Partition Functions via Machine Learning. Chemical Science 2022, 13 (26), 7900–7906. DOI: https://doi.org/10.1039/D2SC01334G </li>
            <li>Qi, X.; Jin, B.; Cai, B.; Yan, F.; De Yoreo, J.; Chen, C.-L.; Pfaendtner, J. Molecular Driving Force for Facet Selectivity of Sequence-Defined Amphiphilic Peptoids at Au–Water Interfaces. J. Phys. Chem. B 2022, 126 (27), 5117–5126. DOI: https://doi.org/10.1021/acs.jpcb.2c02638 </li>
            <li>Xie, Z.-L.; Liu, X.; Valentine, A. J. S.; Lynch, V. M.; Tiede, D. M.; Li, X.; Mulfort, K. L. Bimetallic Copper/Ruthenium/Osmium Complexes: Observation of Conformational Differences Between the Solution Phase and Solid State by Atomic Pair Distribution Function Analysis. Angewandte Chemie International Edition 2022, 61 (5), e202111764. DOI: https://doi.org/10.1002/anie.202111764 </li>
            <li>Qi, X.; Zhao, Y.; Lachowski, K.; Boese, J.; Cai, Y.; Dollar, O.; Hellner, B.; Pozzo, L.; Pfaendtner, J.; Chun, J.; Baneyx, F.; Mundy, C. J. Predictive Theoretical Framework for Dynamic Control of Bioinspired Hybrid Nanoparticle Self-Assembly. ACS Nano 2022, 16 (2), 1919–1928. DOI: https://doi.org/10.1021/acsnano.1c04923 </li>
            <li>Nyambura, C. W.; Sampath, J.; Nance, E.; Pfaendtner, J. Exploring Structure and Dynamics of the Polylactic-Co-Glycolic Acid–Polyethylene Glycol Copolymer and Its Homopolymer Constituents in Various Solvents Using All-Atom Molecular Dynamics. Journal of Applied Polymer Science 2022, 139 (31), e52732. DOI: https://doi.org/10.1002/app.52732 </li>
            <li>G. Pelkie, B.; Valleau, S. Machine Learning the Quantum Flux–Flux Correlation Function for Catalytic Surface Reactions. Digital Discovery 2022, 1 (6), 851–858. DOI: https://doi.org/10.1039/D2DD00051B </li>
            <li>Hare, S. R.; Pfaendtner, J. Elucidating the Role of Catalytic Amino Acid Residues in the Peptide-Mediated Silica Oligomerization Reaction Mechanism. Phys. Chem. Chem. Phys. 2022, 24 (6), 3664–3674. DOI: https://doi.org/10.1039/D1CP04542C </li>
            <li>Intan, N. N.; Pfaendtner, J. Composition of Oxygen Functional Groups on Graphite Surfaces. J. Phys. Chem. C 2022, 126 (26), 10653–10667. DOI: https://doi.org/10.1021/acs.jpcc.2c01258 </li>
            <li>Nyambura, C. W.; Nance, E.; Pfaendtner, J. Examining the Effect of Polymer Extension on Protein–Polymer Interactions That Occur during Formulation of Protein-Loaded Poly(Lactic Acid-Co-Glycolic Acid)-Polyethylene Glycol Nanoparticles. Polymers 2022, 14 (21), 4730. DOI: https://doi.org/10.3390/polym14214730 </li>
            <li>Nyambura, C. W. Rational Design of Protein-Loaded Polymeric Nanoparticles: A Computational and Experimental Approach. Ph.D., University of Washington, United States -- Washington, 2022. https://www.proquest.com/docview/2719424803/abstract/A6818D28BB824660PQ/1 </li>



          </ol>
          <h4>Chemistry</h4>
          <ol>
            <li>Maloney, T. P.; Berman, J. L.; Michael, F. E. Metal-Free Allylic C−H Amination of Vinylsilanes and Vinylboronates Using Silicon or Boron as a Regioselectivity Switch. Angewandte Chemie 2022, 134 (45), e202210109. DOI: https://doi.org/10.1002/ange.202210109 </li>
            <li>Wildman, A.; Tao, Z.; Zhao, L.; Hammes-Schiffer, S.; Li, X. Solvated Nuclear–Electronic Orbital Structure and Dynamics. J. Chem. Theory Comput. 2022, 18 (3), 1340–1346. DOI: https://doi.org/10.1021/acs.jctc.1c01285 </li>
            <li>Liu, A.; Chow, M.; Wildman, A.; Frisch, M. J.; Hammes-Schiffer, S.; Li, X. Simultaneous Optimization of Nuclear–Electronic Orbitals. J. Phys. Chem. A 2022, 126 (39), 7033–7039. DOI: https://doi.org/10.1021/acs.jpca.2c05172 </li>
            <li>Zheng, T.; L. Berman, J.; E. Michael, F. Diastereoconvergent Synthesis of Anti -1,2-Amino Alcohols with N-Containing Quaternary Stereocenters via Selenium-Catalyzed Intermolecular C–H Amination. Chemical Science 2022, 13 (33), 9685–9692. DOI: https://doi.org/10.1039/D2SC02648A </li>
            <li>Parker Maloney, T.; F. Dohoda, A.; C. Zhu, A.; E. Michael, F. Stereoretentive and Regioselective Selenium-Catalyzed Intermolecular Propargylic C–H Amination of Alkynes. Chemical Science 2022, 13 (7), 2121–2127. DOI: https://doi.org/10.1039/D1SC07067C </li>
            <li>Stropoli, S. J.; Khuu, T.; Messinger, J. P.; Karimova, N. V.; Boyer, M. A.; Zakai, I.; Mitra, S.; Lachowicz, A. L.; Yang, N.; Edington, S. C.; Gerber, R. B.; McCoy, A. B.; Johnson, M. A. Preparation and Characterization of the Halogen-Bonding Motif in the Isolated Cl–·IOH Complex with Cryogenic Ion Vibrational Spectroscopy. J. Phys. Chem. Lett. 2022, 13 (12), 2750–2756. DOI: https://doi.org/10.1021/acs.jpclett.2c00218 </li>
            <li>Beck, R. A.; Sun, S.; Xu, X.; Gamelin, D. R.; Cao, T.; Li, X. Understanding External Pressure Effects and Interlayer Orbital Exchange Pathways in the Two-Dimensional Magnet─Chromium Triiodide. J. Phys. Chem. C 2022, 126 (45), 19327–19335. DOI: https://doi.org/10.1021/acs.jpcc.2c03884 </li>
            <li>DiRisio, R. J.; Finney, J. M.; McCoy, A. B. Diffusion Monte Carlo Approaches for Studying Nuclear Quantum Effects in Fluxional Molecules. WIREs Computational Molecular Science 2022, 12 (6), e1615. DOI: https://doi.org/10.1002/wcms.1615 </li>
            <li>Lu, F.; Cheng, L.; DiRisio, R. J.; Finney, J. M.; Boyer, M. A.; Moonkaen, P.; Sun, J.; Lee, S. J. R.; Deustua, J. E.; Miller, T. F. I.; McCoy, A. B. Fast Near Ab Initio Potential Energy Surfaces Using Machine Learning. J. Phys. Chem. A 2022, 126 (25), 4013–4024. DOI: https://doi.org/10.1021/acs.jpca.2c02243 </li>
            <li>Bourgeois, M. R.; Rossi, A. W.; Khorasani, S.; Masiello, D. J. Optical Control over Thermal Distributions in Topologically Trivial and Non-Trivial Plasmon Lattices. ACS Photonics 2022, 9 (11), 3656–3667. DOI: https://doi.org/10.1021/acsphotonics.2c01155 </li>


          </ol>
          <h4>Civil and Environmental Engineering</h4>
          <ol>
            <li>Ni, W.; Morgan, J. A.; Horner-Devine, A. R.; Kumar, N.; Ahrendt, S. Impacts of Sea-Level Rise on Morphodynamics and Riverine Flooding in an Idealized Estuary. Water Resources Research 2022, 58 (12), e2022WR032544. DOI: https://doi.org/10.1029/2022WR032544 </li>
            <li>Riddle, M. CFD Modeling of an Oscillating Wave Surge Converter Using the Overset Grid Method. Master’s, University of Washington, United States -- Washington, 2022. https://www.proquest.com/docview/2691798471/abstract/B3C34E7C06B34937PQ/1</li>
            <li>Lewis, N. S.; Lehman, D. E.; Motley, M. R.; Arduino, P.; Roeder, C. W.; Pyke, C. N.; Sullivan, K. P. Integrated Study of Existing Tsunami Design Standards. Journal of Structural Engineering 2022, 148 (12), 04022200. DOI: https://doi.org/10.1061/(ASCE)ST.1943-541X.0003506 </li>
          </ol>
          
          <h4>Computer Science</h4>
          <ol>
            <li>Liu, Alisa, et al. "WANLI: Worker and AI Collaboration for Natural Language Inference Dataset Creation." arXiv preprint arXiv:<a href="https://arxiv.org/abs/2201.05955">2201.05955</a> (2022).</li>
            <li>Shridhar, Mohit, Lucas Manuelli, and Dieter Fox. "Cliport: What and where pathways for robotic manipulation." <i>Conference on Robot Learning</i>. PMLR, 2022. URL: <a href="https://proceedings.mlr.press/v164/shridhar22a.html">PDF</a></li>
            <li>Hundt, A.; Agnew, W.; Zeng, V.; Kacianka, S.; Gombolay, M. Robots Enact Malignant Stereotypes. In Proceedings of the 2022 ACM Conference on Fairness, Accountability, and Transparency; FAccT ’22; Association for Computing Machinery: New York, NY, USA, 2022; pp 743–756. DOI: https://doi.org/10.1145/3531146.3533138 </li>
          </ol>

          <h4>Mechanical Engineering</h4>
          <ol>
            <li>Xie, W.; Reder, N. P.; Koyuncu, C.; Leo, P.; Hawley, S.; Huang, H.; Mao, C.; Postupna, N.; Kang, S.; Serafin, R.; Gao, G.; Han, Q.; Bishop, K. W.; Barner, L. A.; Fu, P.; Wright, J. L.; Keene, C. D.; Vaughan, J. C.; Janowczyk, A.; Glaser, A. K.; Madabhushi, A.; True, L. D.; Liu, J. T. C. Prostate Cancer Risk Stratification via Nondestructive 3D Pathology with Deep Learning–Assisted Gland Analysis. Cancer Research 2022, 82 (2), 334–345. DOI: https://doi.org/10.1158/0008-5472.CAN-21-2843 </li>
            <li>Meuris, B. Model Reduction for Dynamical Systems: Machine Learning and Memory. Ph.D., University of Washington, United States -- Washington, 2022. https://www.proquest.com/docview/2769228545/abstract/146F3F06E05C4AA4PQ/1</li>
          </ol>

          <h4>Physics</h4>
          <ol>
            <li>Illa, M.; Savage, M. J. Basic Elements for Simulations of Standard-Model Physics with Quantum Annealers: Multigrid and Clock States. Phys. Rev. A 2022, 106 (5), 052605. DOI: https://doi.org/10.1103/PhysRevA.106.052605</li>
            <li>Tetef, S.; Kashyap, V.; Holden, W. M.; Velian, A.; Govind, N.; Seidler, G. T. Informed Chemical Classification of Organophosphorus Compounds via Unsupervised Machine Learning of X-Ray Absorption Spectroscopy and X-Ray Emission Spectroscopy. J. Phys. Chem. A 2022, 126 (29), 4862–4872. DOI: https://doi.org/10.1021/acs.jpca.2c03635 </li>
          </ol>

          
          
        </TabItem>

        <TabItem value="2021">
          <h4>Aeronautics and Astronautics</h4>
          <ol>
            <li>TE Benedett and CJ Hansen. "Effect of geometric and magnetic boundary conditions on magnetic islands in 3D force-free ideal MHD equilibria." <i>Nuclear Fusion</i> 61 (3) 036022 (2021) DOI: <a href="https://doi.org/10.1088/1741-4326/abd41c">10.1088/1741-4326/abd41c</a></li>
          </ol>
          
          <h4>Chemical Engineering</h4>
          <ol>
            <li>A. Joseph, C. Nyambura1,D. Bondurant, K. Corry, D. Beebout, T. Wood, Jim Pfaendtner, E. Nance, “Formulation and Efficacy of Catalase-Loaded Nanoparticles for the Treatment of Neonatal Hypoxic-Ischemic Encephalopathy”, Pharmaceutics, 2021, 13(8), 1131. DOI: 10.3390/pharmaceutics13081131</li>

            <li>J. Prelesnik1, R. Alberstein, S. Zhang, H. Pyles, D. Baker, J. Pfaendtner, J. De Yoreo, A. Tezcan, R.. Remsing, C. J. Mundy, “Ion-dependent protein–surface interactions from intrinsic solvent response”, PNAS, 2021, 118(26), e2025121118. DOI: 10.1073/pnas.2025121118</li>
            
            <li>C. Jia, S. Xie, W. Zhang, N. Intan2, J. Sampath2, J. Pfaendtner, H. Lin, “Deconstruction of high-density polyethylene into liquid hydrocarbon fuels and lubricants by hydrogenolysis over Ru catalyst”, Chem. Cat., 2021, 1(2), 437-455. DOI: 10.1016/j.checat.2021.04.002</li>

            <li>J. Ludwig1, J. Smith, J. Pfaendtner, “Analyzing the Long Time-Scale Dynamics of Uremic Toxins Bound to Sudlow Site II in Human Serum Albumin”, J. Phys. Chem. B., 2021, 125(11), 2910-2920. DOI: 10.1021/acs.jpcb.1c00221</li>
            
            <li>S. Roeters, T. Golbek, M. Bregnhøj, T. Drace, S. Alamdari1, W. Roseboom, G. Kramer, T Šantl-Temkiv, K. Finster, J. Pfaendtner, S. Woutersen, T. Boesen, T. Weidner, “Ice-nucleating proteins are activated by low temperatures to control the structure of interfacial water” Nat Commun, 2021, 12, 1183 . DOI: 10.1038/s41467-021-21349-3</li>

            <li>N. Intan2, J. Pfaendtner, “Effect of Fluoroethylene Carbonate Additives on the Initial Formation of the Solid Electrolyte Interphase on an Oxygen-Functionalized Graphitic Anode in Lithium-Ion Batteries”, 2021, 13(7), 8169-8180: DOI: 10.1021/acsami.0c18414</li>
          </ol>

          <h4>Chemistry</h4>
          <ol>
            <li>Zhang, L., Kang, C., Zhang, G., Pan, Z., Huang, Z., Xu, S., Rao, H., Liu, H., Wu, S., Wu, X. and Li, X., 2021. All‐Inorganic CsPbI3 Quantum Dot Solar Cells with Efficiency over 16% by Defect Control. <i>Advanced Functional Materials</i>, 31(4), p.2005930. DOI: <a href="https://doi.org/10.1002/adfm.202005930">10.1002/adfm.202005930</a></li>
          </ol>

          <h4>Computer Science</h4>
          <ol>
            <li>Alisa Liu, Maarten Sap, Ximing Lu, Swabha Swayamdipta, Chandra Bhagavatula, Noah A. Smith, Yejin Choi. 2021. DExperts: Decoding-Time Controlled Text Generation with Experts and Anti-Experts. <i>Proceedings of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing</i>. Virtual Event, USA. DOI: <a href="http://dx.doi.org/10.18653/v1/2021.acl-long.522">10.18653/v1/2021.acl-long.522</a></li>

            <li>Xin Liu, Ziheng Jiang, Josh Fromm, Xuhai Xu, Shwetak Patel, and Daniel McDuff. 2021. MetaPhys: Few-Shot Adaptation for Non-Contact Physiological Measurement. <i>ACM Conference on Health, Inference, and Learning</i> (ACM CHIL ’21) April 8–10, 2021, Virtual Event, USA. ACM, New York, NY, USA, 10 pages. <a href="https://doi.org/10.1145/3450439.3451870">10.1145/3450439.3451870</a></li>
          </ol>

          <h4>Physics</h4>          
          <ol>
            <li>AA Kaptanoglu, KD Morgan, CJ Hansen, and SL Brunton. "Physics-constrained, low-dimensional models for magnetohydrodynamics: First-principles and data-driven approaches." <i>Physical Review E</i> 104(1), 015206 (2021) DOI: <a href="https://doi.org/10.1103/PhysRevE.104.015206">10.1103/PhysRevE.104.015206</a> </li>

            <li>Montague Z, Lv H, Otwinowski J, DeWitt WS, Isacchini G, Yip GK, Ng WW, Tsang OTY, Yuan M, Liu H, and Wilson IA, 2021. Dynamics of B cell repertoires and emergence of cross-reactive responses in patients with different severities of COVID-19. <i>Cell Reports</i>, 35(8), p.109173. DOI: <a href="https://doi.org/10.1016/j.celrep.2021.109173">10.1016/j.celrep.2021.109173</a></li>
          </ol>

        </TabItem>

        <TabItem value="2020">
          <h4>Aeronautics and Astronautics</h4>
          <ol>
            <li>TE Benedett, CJ Hansenb, KD Morganc, TR Jarboed. "Effects of temperature and density evolution in MHD simulations of HIT-SI." <i>Physics of Plasmas</i> 27, 042508 (2020) DOI: <a href="https://doi.org/10.1063/1.5142298">10.1063/1.5142298</a></li>
          </ol>
          
          <h4>Chemical Engineering</h4>
          <ol>
            <li>Komp, Evan, and Stéphanie Valleau. "Machine Learning Quantum Reaction Rate Constants." <i>The Journal of Physical Chemistry A</i> 124.41 (2020): 8607-8613. DOI: <a href="https://doi.org/10.1021/acs.jpca.0c05992">10.1021/acs.jpca.0c05992</a></li>

            <li>L.D. Gibson1, J. Pfaendtner, “Solvent Oligomerization Pathways Facilitated by Electrolyte Additives During Solid-Electrolyte Interphase Formation”, PhysChemChemPhys, 2020, 22, 21494-21503. DOI: 10.1039/D0CP03286G</li>
            
            <li>S. Alamdari1, S. Roeters, T. Golbek, L. Schmüser, T. Weidner, J. Pfaendtner, “Orientation and Conformation of Proteins at the Air-Water Interface Determined from Integrative Molecular Dynamics Simulations and Sum Frequency Generation Spectroscopy”, Langmuir, 2020, 36(40), 11855-11685. DOI: 10.1021/acs.langmuir.0c01881</li>

            <li>W. Beckner1, C.M. Ashraf2, J. Lee, D.A.C. Beck, J. Pfaendtner, “Continuous Molecular Representations of Ionic Liquids”, J. Phys. Chem. B. 2020, 124(38), 8437-8357. DOI: 10.1021/acs.jpcb.0c05938</li>

            <li>M. Xue, J. Sampath2, R. Gebhart, H.J. Haugen, S.P. Lyngstadaas, J. Pfaendtner, G.P. Drobny,” Studies of dynamic binding of amino acids to TiO2 nanoparticle surfaces by Solution NMR and Molecular Dynamics Simulations”, Langmuir, 2020, in press. DOI: 10.1021/acs.langmuir.0c01256</li>

            <li>J. Sampath32, S. Alamdari1, J. Pfaendtner, “Closing the Gap Between Modeling and Experiments in the Self-assembly of Biomolecules at Interfaces and in Solution”, Chem. Matl., 2020, 32(19), 8043-8059. DOI: 10.1021/acs.chemmater.0c01891</li>
              
            <li>S. Summers, C. Kraft, S. Alamdari1, J. Pfaendtner, J. Kaar, “Enhanced Activity and Stability of Acidothermus cellulolyticus Endoglucanase 1 in Ionic Liquids via Engineering Active Site Residues and Non-native Disulfide Bridges”, ACS Sus. Chem & Eng, 2020, 8(30), 11299-11307. DOI: 10.1021/acssuschemeng.0c03242</li>

            <li>E.L. Buckle, J. Sampath2, N. Michael, S.D. Whedon, C.J.A. Leonen, J. Pfaendtner, G. Drobny, C. Chatterjee, “Trimethylation of the R5 silica‐precipitating peptide increases silica particle size by redirecting orthosilicate binding,” ChemBioChem, 2020, 22, 3208-3211</li>

            <li>J. Smith1, J. Pfaendtner, “Elucidating the molecular interactions between uremic toxins and the Sudlow II binding site of human serum albumin,” J. Phys. Chem. B, 2020, 124(19), 3922-3930. DOI: 10.1021/acs.jpcb.0c02015</li>

            <li>J. Sampath2, A. Kullman1, R. Gebhart, G. Drobny, J. Pfaendtner, “Molecular recognition and specificity of biomolecules to titanium dioxide from molecular dynamics simulations,” npj Comput. Mater. 2020, 6(34), DOI: 10.1038/s41524-020-0288-7</li>

            <li>B. Hellner, S. Alamdari1, H. Pyles, S. Zhang, A. Prakash1, K. G. Sprenger1, J. DeYoreo, D. Baker, J. Pfaendtner, F. Baneyx, “Sequence–Structure–Binding Relationships Reveal Adhesion Behavior of the Car9 Solid-Binding Peptide: An Integrated Experimental and Simulation Study,” J. Am. Chem. Soc. 2020, 142(5), 2355-2363. DOI: 10.1021/jacs.9b11617</li>

            <li>S. Alamdari1, J. Pfaendtner, “Impact of glutamate carboxylation in the adsorption of the α-1 domain of osteocalcin to hydroxyapatite and titania,” Mol. Syst. Des. Eng. 2020, 5, 620-631. DOI: 10.1039/C9ME00158A</li>
            
            <li>J. Smith1, P. McMullen, Z. Yuan, J. Pfaendtner, S. Jiang, “Elucidating Molecular Design Principles for Charge-Alternating Peptides,” Biomacromolecules 2020, 21(2), 435-443. DOI: 10.1021/acs.biomac.9b01191</li>
            
          </ol>

          <h4>Chemistry</h4>
          <ol>
            <li>Kasper, J.M. and Li, X., 2020. Natural transition orbitals for complex two‐component excited state calculations. <i>Journal of computational chemistry</i>, 41(16), pp.1557-1563. DOI: <a href="https://doi.org/10.1002/jcc.26196">10.1002/jcc.26196</a></li>
          </ol>

          <h4>Computer Science</h4>
          <ol>
            <li>William Agnew, Christopher Xie, Aaron Walsman, Octavian Murad, Caelen Wang, Pedro Domingos, and Siddhartha Srinivasa. "Amodal 3D Reconstruction for Robotic Manipulation via Stability and Connectivity" <i>4th Conference on Robot Learning (CORL) for a Plenary Talk</i> (20/485). Spotlight at Object-Oriented Learning Workshop @ ICML2020. DOI: <a href="https://arxiv.org/abs/2009.13146">arXiv:2009.13146</a></li>

            <li>Xin Liu, Josh Fromm, Shwetak Patel, Daniel McDuff. 2020. Multi-Task Temporal Shift Attention Networks for On-Device Contactless Vitals Measurement. <i>34th Conference on Neural Information Processing Systems</i> (NeurIPS 2020), Vancouver, Canada. <a href="https://arxiv.org/abs/2006.03790">arXiv:2006.03790</a></li>
          </ol>

          <h4>Physics</h4>
          <ol>
            <li>AA Kaptanoglu, KD Morgan, CJ Hansen, SL Brunton. "Characterizing magnetized plasmas with dynamic mode decomposition." <i>Physics of Plasmas</i> 27, 032108 (2020) DOI: <a href="https://doi.org/10.1063/1.5138932">10.1063/1.5138932</a></li>
          </ol>

          <h4>Public Health</h4>
          <ol>
            <li>PE Rummo, N Pho, MA Bragg, CA Roberto, B Elbel. "Trends in Store-Level Sales of Sugary Beverages and Water in the US, 2006–2015." <i>American Journal of Preventive Medicine</i> 59 (4), 522-529 (2020) DOI: <a href="https://doi.org/10.1016/j.amepre.2020.04.022">10.1016/j.amepre.2020.04.022</a></li>
          </ol>
        </TabItem>

        <TabItem value="2019">
          <h4>Chemical Engineering</h4>
          <ol>
            <li>J. Sampath2, J. Pfaendtner, “Amphiphilic peptide binding on crystalline vs. amorphous silica from molecular dynamics simulations,” Mol. Phys. 2019, 117(23-24), 3642-3650. DOI: 10.1080/00268976.2019.1657192</li>
            
            <li>P. Emani, Y. Yimer2, S. Davidowski, R. Gebhart, H. Ferreira, I. Kuprov, J. Pfaendtner, G. Drobny, “Combining Molecular and Spin Dynamics Simulations with Solid-State NMR to Study Amphiphilic Lysine-Leucine Repeat Peptide Aggregates,” J. Phys. Chem. B 2019, 123(51), 10915-10929. DOI: 10.1021/acs.jpcb.9b09245</li>
            
            <li>B. Li, P. Jain, J. Ma, J. Smith1, Z. Yuan, H.C. Hung, Y. He, X. Lin, K. Wu, J. Pfaendtner, S. Jiang, “Trimethylamine N-oxide–derived zwitterionic polymers: A new class of ultralow fouling bioinspired materials,” Sci. Adv. 2019, 5(6), eaaw9562. DOI: 10.1126/sciadv.aaw9562.</li>
            
            <li>W. Beckner1, J. Pfaendtner, “Fantastic Liquids and Where to Find Them: Optimizations of Discrete Chemical Space,” J. Chem. Inf. Model. 2019, 59(6), 2617-2625. DOI: 10.1021/acs.jcim.9b00087</li>
            
            <li>M. Mao1, J. Sampath2, K.G. Sprenger1, G. Drobny, J. Pfaendtner, “Molecular Driving Forces in Peptide Adsorption to Metal Oxide Surfaces,” Langmuir 2019, 35(17), 5911-5920. DOI: 10.1021/acs.langmuir.8b01392</li>
            
            <li>C.D. Fu1, Y. He, J. Pfaendtner, “Diagnosing the Impact of External Electric Fields Chemical Kinetics: Application to Toluene Oxidation and Pyrolysis,” J. Phys. Chem A 2019, 123(14), 3080-3089. DOI: 10.1021/acs.jpca.8b11780</li>
            
            <li>E.L. Buckle*, A. Prakash1*, M. Bonomi, J. Sampath2, J. Pfaendtner, G.P. Drobny, “A Solid-State NMR and MD Study of the Structure of the Statherin Mutant SNa15 on Mineral Surfaces,” J. Am. Chem. Soc. 2019, 141(5), 1998-2011. DOI: 10.1021/jacs.8b10990</li>
            
          </ol>

          <h4>Chemistry</h4>
          <ol>
            <li>Bai, F., Zhang, J., Yuan, Y., Liu, H., Li, X., Chueh, C.C., Yan, H., Zhu, Z. and Jen, A.K.Y., 2019. A 0D/3D Heterostructured All‐Inorganic Halide Perovskite Solar Cell with High Performance and Enhanced Phase Stability. <i>Advanced Materials</i>, 31(48), p.1904735. DOI: <a href="https://doi.org/10.1002/adma.201904735">10.1002/adma.201904735</a></li>

            <li>Fu, W., Liu, H., Shi, X., Zuo, L., Li, X. and Jen, A.K.Y., 2019. Tailoring the Functionality of Organic Spacer Cations for Efficient and Stable Quasi‐2D Perovskite Solar Cells. <i>Advanced Functional Materials</i>, 29(25), p.1900221. DOI: <a href="https://doi.org/10.1002/adfm.201900221">10.1002/adfm.201900221</a></li>

            <li>Stetina, T.F., Clark, A.E. and Li, X., 2019. X‐ray absorption signatures of hydrogen‐bond structure in water–alcohol solutions. <i>International Journal of Quantum Chemistry</i>, 119(1), p.e25802. DOI: <a href="https://doi.org/10.1002/qua.25802">10.1002/qua.25802</a></li>
          </ol>          
        </TabItem>        
      </Tabs>
    </div>

  </div>
</Layout>
  );
}