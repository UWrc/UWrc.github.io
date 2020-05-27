import React from 'react';
import InViewMonitor from 'react-inview-monitor';

const COLORS = [
    '#6883BA',
    '#033860',
    '#AB4E68',
    '#4B2E83',
    '#B7A57A',
]

const StatItem = ({ idx, caption='caption', number='number', slideInClass='animate__slideInUp' }) =>
    <InViewMonitor
        key={idx}
        classNameNotInView="col-4 vis-hidden"
        classNameInView={`col-4 fadeineffects__item animate__animated ${slideInClass}`}
    >
        <div
            className="rounded d-flex justify-content-center align-items-center flex-column"
            style={{
                height: '200px',
                backgroundColor: COLORS[idx]
            }}
        >
            <h2 className="display-3 pt-4 text-white">{number}</h2>
            <p className="stat-caption text-white">{caption}</p>
        </div>
    </InViewMonitor>

const StatContainer = () =>
    <div>
        <div className="d-flex justify-content-center mb-5">
            <StatItem idx={0} number="18,376" caption="CPU Cores" />
            <StatItem idx={1} number="35,840" caption="GPU Cores" />
            <StatItem idx={2} number="3000 TB" caption="Terabytes of Memory" />
        </div>

        <div className="d-flex justify-content-center mb-5">
            <StatItem idx={3} number="100" caption="Users" />
            <StatItem idx={4} number="4000 TB" caption="Terabytes of Data" />
        </div>
    </div>

export default StatContainer