-- Supabase Database Schema for SkyMax PLC Sound Web Platform
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price_tag TEXT DEFAULT 'Inquire for Quote',
    image_url TEXT,
    features JSONB DEFAULT '[]'::JSONB,
    specifications JSONB DEFAULT '{}'::JSONB,
    is_featured BOOLEAN DEFAULT false
);

-- 3. Inquiries Table (Customer Contact & Quotes)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'In Review', 'Replied', 'Archived')),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Category Policies
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can manage categories" ON public.categories FOR ALL USING (true);

-- Product Policies
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can manage products" ON public.products FOR ALL USING (true);

-- Inquiry Policies
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view and update inquiries" ON public.inquiries FOR ALL USING (true);

-- Seed Data: Sample Categories
INSERT INTO public.categories (name, slug, description) VALUES
('Studio Monitors', 'studio-monitors', 'Precision active nearfield and midfield studio acoustic reference systems.'),
('Live Sound', 'live-sound', 'High-output concert line arrays, subwoofers, and touring stage acoustics.'),
('Microphones', 'microphones', 'Broadcast studio condenser and dynamic high-fidelity vocal microphones.'),
('DSP & Mixers', 'dsp-mixers', 'Digital signal matrix processors, routing nodes, and console engines.'),
('Acoustic Solutions', 'acoustic-solutions', 'Broadband absorbers, diffuser panels, and architectural sound isolation.')
ON CONFLICT (name) DO NOTHING;

-- Seed Data: Professional Sound Gear
INSERT INTO public.products (name, category, description, price_tag, is_featured, features, specifications) VALUES
(
    'SkyMax S-700 Reference Monitor',
    'Studio Monitors',
    'Active 2-way coaxial studio reference monitor with linear phase response, beryllium tweeter, and custom class-D bi-amplification.',
    'Studio Grade',
    true,
    '["Ultra-flat 35Hz - 22kHz frequency response", "Class-D 300W Bi-Amplified architecture", "DSP Room Compensation calibration EQ", "Precision Beryllium Inverted Dome Tweeter"]'::JSONB,
    '{"Frequency Response": "35Hz - 22kHz (±1.5dB)", "Max SPL": "118 dB @ 1m", "Amplifier Power": "200W LF + 100W HF", "Inputs": "XLR Balanced, AES/EBU Digital"}'::JSONB
),
(
    'AeroLine-210 Array Module',
    'Live Sound',
    'Dual 10-inch active line array element engineered for large venue acoustic throw and articulate vocal intelligibility.',
    'Touring System',
    true,
    '["Dual 10-inch neodymium low-frequency drivers", "3-inch titanium diaphragm compression driver", "Integrated quick-rig hardware (0° to 10° splay)", "Weather-resistant birch polyurea coating"]'::JSONB,
    '{"Frequency Response": "55Hz - 19kHz", "Max SPL": "139 dB Peak", "Dispersion": "100° Horizontal x 10° Vertical", "Power Handling": "1200W AES / 2400W Program"}'::JSONB
),
(
    'SkyMax VoxPro C-900',
    'Microphones',
    'Large-diaphragm multi-pattern vacuum tube condenser microphone delivering warmth, rich harmonics, and silky top-end detail.',
    'Broadcast & Studio',
    true,
    '["Hand-selected dual 1-inch gold-sputtered capsule", "NOS 12AX7 vacuum tube analog circuitry", "9 selectable polar patterns via dedicated power supply", "Custom transformer-coupled balanced output"]'::JSONB,
    '{"Polar Patterns": "Cardioid, Omni, Figure-8 + 6 intermediates", "Frequency Range": "20Hz - 20kHz", "Self-Noise": "9 dBA (A-weighted)", "Dynamic Range": "136 dB"}'::JSONB
),
(
    'UltraDSP 808 Matrix Processor',
    'DSP & Mixers',
    '8-in / 8-out networked digital signal processor featuring FIR acoustic filtering, auto-mixing, and Dante audio over IP.',
    'System Node',
    false,
    '["32-bit floating point 96kHz DSP engine", "Dante Audio Network 16x16 Channel support", "Acoustic Echo Cancellation (AEC) and FIR filters", "Web browser and RS-232 telemetry control"]'::JSONB,
    '{"Inputs/Outputs": "8 Balanced Mic/Line In, 8 Balanced Out", "DSP Resolution": "32-bit / 96kHz", "THD+N": "< 0.002%", "Latency": "< 0.8ms"}'::JSONB
),
(
    'SkyMax SubX-18 Pro Subwoofer',
    'Live Sound',
    'High-excursion 18-inch vented concert subwoofer delivering thunderous low-end impact down to 28Hz.',
    'Sub-Bass',
    true,
    '["18-inch neodymium woofer with 4.5-inch voice coil", "2400W integrated Class-D power amp module", "Selectable cardioid dispersion preset arrays", "Heavy-duty Baltic birch enclosure"]'::JSONB,
    '{"Frequency Range": "28Hz - 120Hz (-3dB)", "Max SPL": "141 dB Peak", "Amplifier Peak": "2400 Watts", "Weight": "52 kg"}'::JSONB
),
(
    'SonicWave Diffusion Matrix Panel',
    'Acoustic Solutions',
    'Two-dimensional quadratic residue sound diffuser engineered to disperse flutter echoes while retaining natural room acoustics.',
    'Architectural',
    false,
    '["QRD 2D mathematical scatter algorithm", "High-density solid hardwood construction", "Effective dispersion bandwidth: 600Hz - 6.5kHz", "Class A flame-retardant matte finish"]'::JSONB,
    '{"Dimensions": "600 x 600 x 120 mm", "Diffusion Range": "600Hz - 6500Hz", "Material": "Solid FSC Birch Wood", "Mounting": "Wall / Ceiling Cleat System"}'::JSONB
);
