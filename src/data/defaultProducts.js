export const DEFAULT_PRODUCTS = [
  {
    id: 's-700-monitor',
    name: 'SkyMax S-700 Reference Monitor',
    category: 'Studio Monitors',
    description: 'Active 2-way coaxial studio reference monitor with linear phase response, beryllium tweeter, and custom class-D bi-amplification.',
    price_tag: 'Studio Grade',
    is_featured: true,
    features: [
      'Ultra-flat 35Hz - 22kHz frequency response',
      'Class-D 300W Bi-Amplified architecture',
      'DSP Room Compensation calibration EQ',
      'Precision Beryllium Inverted Dome Tweeter'
    ],
    specifications: {
      'Frequency Response': '35Hz - 22kHz (±1.5dB)',
      'Max SPL': '118 dB @ 1m',
      'Amplifier Power': '200W LF + 100W HF',
      'Inputs': 'XLR Balanced, AES/EBU Digital'
    }
  },
  {
    id: 'aeroline-210',
    name: 'AeroLine-210 Array Module',
    category: 'Live Sound',
    description: 'Dual 10-inch active line array element engineered for large venue acoustic throw and articulate vocal intelligibility.',
    price_tag: 'Touring System',
    is_featured: true,
    features: [
      'Dual 10-inch neodymium low-frequency drivers',
      '3-inch titanium diaphragm compression driver',
      'Integrated quick-rig hardware (0° to 10° splay)',
      'Weather-resistant birch polyurea coating'
    ],
    specifications: {
      'Frequency Response': '55Hz - 19kHz',
      'Max SPL': '139 dB Peak',
      'Dispersion': '100° Horizontal x 10° Vertical',
      'Power Handling': '1200W AES / 2400W Program'
    }
  },
  {
    id: 'voxpro-c900',
    name: 'SkyMax VoxPro C-900',
    category: 'Microphones',
    description: 'Large-diaphragm multi-pattern vacuum tube condenser microphone delivering warmth, rich harmonics, and silky top-end detail.',
    price_tag: 'Broadcast & Studio',
    is_featured: true,
    features: [
      'Hand-selected dual 1-inch gold-sputtered capsule',
      'NOS 12AX7 vacuum tube analog circuitry',
      '9 selectable polar patterns via dedicated power supply',
      'Custom transformer-coupled balanced output'
    ],
    specifications: {
      'Polar Patterns': 'Cardioid, Omni, Figure-8 + 6 intermediates',
      'Frequency Range': '20Hz - 20kHz',
      'Self-Noise': '9 dBA (A-weighted)',
      'Dynamic Range': '136 dB'
    }
  },
  {
    id: 'ultradsp-808',
    name: 'UltraDSP 808 Matrix Processor',
    category: 'DSP & Mixers',
    description: '8-in / 8-out networked digital signal processor featuring FIR acoustic filtering, auto-mixing, and Dante audio over IP.',
    price_tag: 'System Node',
    is_featured: false,
    features: [
      '32-bit floating point 96kHz DSP engine',
      'Dante Audio Network 16x16 Channel support',
      'Acoustic Echo Cancellation (AEC) and FIR filters',
      'Web browser and RS-232 telemetry control'
    ],
    specifications: {
      'Inputs/Outputs': '8 Balanced Mic/Line In, 8 Balanced Out',
      'DSP Resolution': '32-bit / 96kHz',
      'THD+N': '< 0.002%',
      'Latency': '< 0.8ms'
    }
  },
  {
    id: 'subx-18',
    name: 'SkyMax SubX-18 Pro Subwoofer',
    category: 'Live Sound',
    description: 'High-excursion 18-inch vented concert subwoofer delivering thunderous low-end impact down to 28Hz.',
    price_tag: 'Sub-Bass',
    is_featured: true,
    features: [
      '18-inch neodymium woofer with 4.5-inch voice coil',
      '2400W integrated Class-D power amp module',
      'Selectable cardioid dispersion preset arrays',
      'Heavy-duty Baltic birch enclosure'
    ],
    specifications: {
      'Frequency Range': '28Hz - 120Hz (-3dB)',
      'Max SPL': '141 dB Peak',
      'Amplifier Peak': '2400 Watts',
      'Weight': '52 kg'
    }
  },
  {
    id: 'sonicwave-qrd',
    name: 'SonicWave Diffusion Matrix Panel',
    category: 'Acoustic Solutions',
    description: 'Two-dimensional quadratic residue sound diffuser engineered to disperse flutter echoes while retaining natural room acoustics.',
    price_tag: 'Architectural',
    is_featured: false,
    features: [
      'QRD 2D mathematical scatter algorithm',
      'High-density solid hardwood construction',
      'Effective dispersion bandwidth: 600Hz - 6.5kHz',
      'Class A flame-retardant matte finish'
    ],
    specifications: {
      'Dimensions': '600 x 600 x 120 mm',
      'Diffusion Range': '600Hz - 6500Hz',
      'Material': 'Solid FSC Birch Wood',
      'Mounting': 'Wall / Ceiling Cleat System'
    }
  }
];

export const CATEGORIES = [
  'All',
  'Studio Monitors',
  'Live Sound',
  'Microphones',
  'DSP & Mixers',
  'Acoustic Solutions'
];
