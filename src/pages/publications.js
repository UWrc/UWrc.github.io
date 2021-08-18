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
      Conference papers, peer-reviewed journal articles, and other scholarly works are the result of your hard work of which HYAK was one helping hand. Please consider citing or acknowleding HYAK in your final work and then let us know so it can be considered to appear in our select publication list.
      </p>

      <pre>
        The HYAK Consortium. "Title TBD." arXiv:4444.55555 (2021)
      </pre>
      
      <pre>

      </pre>
    </div>
  </div>
  
  <div class="container">
    <div class="row">
      <h3>Select Publications</h3>
      <p>
      These are select works that were produced using a HYAK cluster in any given year. While hundreds of papers are produced each year using HYAK, we limit the select list below to 10 for the sake of brevity. If you would like your publication to be considered for inclusion onto this list please <a href="mailto:help@uw.edu?subject=HYAK publication">e-mail us</a> with the citation.
      </p>
    </div>
    
    <div class="row">
      <Tabs
        className="unique-tabs"
        defaultValue="2021"
        values={[
          {label: '2021', value: '2021'},
          {label: '2020', value: '2020'},
          {label: '2019', value: '2019'},
        ]}>
        <TabItem value="2021">
          <h4>Aeronautics and Astronautics</h4>
          <ol>
            <li>TE Benedett and CJ Hansen. "Effect of geometric and magnetic boundary conditions on magnetic islands in 3D force-free ideal MHD equilibria." <i>Nuclear Fusion</i> 61 (3) 036022 (2021) DOI: <a href="https://doi.org/10.1088/1741-4326/abd41c">10.1088/1741-4326/abd41c</a></li>
          </ol>

          <h4>Chemistry</h4>
          <ol>
            <li>Zhang, L., Kang, C., Zhang, G., Pan, Z., Huang, Z., Xu, S., Rao, H., Liu, H., Wu, S., Wu, X. and Li, X., 2021. All‐Inorganic CsPbI3 Quantum Dot Solar Cells with Efficiency over 16% by Defect Control. <i>Advanced Functional Materials</i>, 31(4), p.2005930. DOI: <a href="https://doi.org/10.1002/adfm.202005930">10.1002/adfm.202005930</a></li>
          </ol>

          <h4>Computer Science</h4>
          <ol>
            <li>Alisa Liu, Maarten Sap, Ximing Lu, Swabha Swayamdipta, Chandra Bhagavatula, Noah A. Smith, Yejin Choi. 2021. DExperts: Decoding-Time Controlled Text Generation with Experts and Anti-Experts. In <i>Proceedings of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing</i>. Virtual Event, USA. DOI: <a href="http://dx.doi.org/10.18653/v1/2021.acl-long.522">10.18653/v1/2021.acl-long.522</a></li>

            <li>Xin Liu, Ziheng Jiang, Josh Fromm, Xuhai Xu, Shwetak Patel, and Daniel McDuff. 2021. MetaPhys: Few-Shot Adaptation for Non-Contact Physiological Measurement. In <i>ACM Conference on Health, Inference, and Learning</i> (ACM CHIL ’21) April 8–10, 2021, Virtual Event, USA. ACM, New York, NY, USA, 10 pages. <a href="https://doi.org/10.1145/3450439.3451870">10.1145/3450439.3451870</a></li>
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
          
          <h4>Chemistry</h4>
          <ol>
            <li>Kasper, J.M. and Li, X., 2020. Natural transition orbitals for complex two‐component excited state calculations. <i>Journal of computational chemistry</i>, 41(16), pp.1557-1563. DOI: <a href="https://doi.org/10.1002/jcc.26196">10.1002/jcc.26196</a></li>
          </ol>

          <h4>Computer Science</h4>
          <ol>
            <li>Xin Liu, Josh Fromm, Shwetak Patel, Daniel McDuff. 2020. Multi-Task Temporal Shift Attention Networks for On-Device Contactless Vitals Measurement. In <i>34th Conference on Neural Information Processing Systems</i> (NeurIPS 2020), Vancouver, Canada. <a href="https://arxiv.org/abs/2006.03790">arXiv:2006.03790</a></li>
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