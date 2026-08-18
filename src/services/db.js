import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';

// Local storage key fallbacks for demo/offline resilience
const LOCAL_PRODUCTS_KEY = 'skymax_local_products';
const LOCAL_INQUIRIES_KEY = 'skymax_local_inquiries';

const getStoredProducts = () => {
  try {
    const data = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
};

const setStoredProducts = (products) => {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products locally', e);
  }
};

const getStoredInquiries = () => {
  try {
    const data = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    return data ? JSON.parse(data) : [
      {
        id: 'inq-1',
        name: 'Marcus Vance',
        email: 'marcus@soundlab.io',
        phone: '+1 555-019-2834',
        subject: 'Studio Acoustic Setup Consultation',
        message: 'Looking to outfit 3 control rooms with the SkyMax S-700 Reference Monitors and SonicWave Diffusion panels.',
        status: 'New',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'inq-2',
        name: 'Elena Rostova',
        email: 'elena@arenatour.com',
        phone: '+44 20 7946 0912',
        subject: 'AeroLine-210 Tour Quote',
        message: 'Need technical specification sheet and bulk pricing for 24 AeroLine-210 modules and 8 SubX-18 subwoofers.',
        status: 'Replied',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ];
  } catch {
    return [];
  }
};

const setStoredInquiries = (inquiries) => {
  try {
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(inquiries));
  } catch (e) {
    console.error('Failed to save inquiries locally', e);
  }
};

// --- PRODUCT SERVICES ---

export const getProducts = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return { data, error: null, source: 'supabase' };
      }
      if (error) {
        console.warn('Supabase products fetch returned error, falling back to local:', error.message);
      }
    } catch (err) {
      console.warn('Supabase fetch failed:', err);
    }
  }

  return { data: getStoredProducts(), error: null, source: 'local' };
};

export const getProductById = async (id) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return { data, error: null, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase getProductById failed:', err);
    }
  }

  const products = getStoredProducts();
  const product = products.find((p) => String(p.id) === String(id));
  return { data: product || null, error: product ? null : 'Product not found', source: 'local' };
};

export const createProduct = async (product) => {
  const newProduct = {
    ...product,
    id: product.id || `prod-${Date.now()}`,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (!error && data) {
        return { data, error: null };
      }
      if (error) throw error;
    } catch (err) {
      console.error('Error inserting product into Supabase:', err);
      return { data: null, error: err.message };
    }
  }

  const products = [newProduct, ...getStoredProducts()];
  setStoredProducts(products);
  return { data: newProduct, error: null };
};

export const updateProduct = async (id, updates) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (!error) return { data, error: null };
      if (error) throw error;
    } catch (err) {
      console.error('Error updating product in Supabase:', err);
      return { data: null, error: err.message };
    }
  }

  const products = getStoredProducts().map((p) =>
    String(p.id) === String(id) ? { ...p, ...updates } : p
  );
  setStoredProducts(products);
  return { data: updates, error: null };
};

export const deleteProduct = async (id) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (!error) return { success: true, error: null };
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting product from Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  const products = getStoredProducts().filter((p) => String(p.id) !== String(id));
  setStoredProducts(products);
  return { success: true, error: null };
};

// --- INQUIRY SERVICES ---

export const getInquiries = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return { data, error: null, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase getInquiries failed:', err);
    }
  }

  return { data: getStoredInquiries(), error: null, source: 'local' };
};

export const createInquiry = async (inquiryData) => {
  const newInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}`,
    status: 'New',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone || null,
          subject: inquiryData.subject,
          message: inquiryData.message,
          product_id: inquiryData.product_id || null,
          status: 'New'
        }])
        .select()
        .single();

      if (!error && data) {
        return { data, error: null };
      }
      if (error) throw error;
    } catch (err) {
      console.error('Error submitting inquiry to Supabase:', err);
      return { data: null, error: err.message };
    }
  }

  const inquiries = [newInquiry, ...getStoredInquiries()];
  setStoredInquiries(inquiries);
  return { data: newInquiry, error: null };
};

export const updateInquiryStatus = async (id, status) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (!error) return { data, error: null };
      if (error) throw error;
    } catch (err) {
      console.error('Error updating inquiry status in Supabase:', err);
      return { data: null, error: err.message };
    }
  }

  const inquiries = getStoredInquiries().map((inq) =>
    String(inq.id) === String(id) ? { ...inq, status } : inq
  );
  setStoredInquiries(inquiries);
  return { data: { id, status }, error: null };
};

export const deleteInquiry = async (id) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (!error) return { success: true, error: null };
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting inquiry in Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  const inquiries = getStoredInquiries().filter((inq) => String(inq.id) !== String(id));
  setStoredInquiries(inquiries);
  return { success: true, error: null };
};
