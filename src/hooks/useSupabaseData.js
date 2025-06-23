import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

/**
 * useSupabaseData - Generic hook to fetch data from a Supabase table
 * @param {string} tableName - The name of the Supabase table to fetch from
 * @param {object} [options] - Optional: { select, orderBy, orderDirection, single, transform }
 * @returns {object} { data, loading, error, refetch }
 */
export function useSupabaseData(tableName, options = {}) {
  const {
    select = '*',
    orderBy = null,
    orderDirection = 'asc',
    single = false,
    transform = null,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(tableName).select(select);
      if (orderBy) {
        query = query.order(orderBy, { ascending: orderDirection === 'asc' });
      }
      if (single) {
        query = query.single();
      }
      const { data: result, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setData(transform ? transform(result) : result);
    } catch (err) {
      setError(err.message || 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName, select, orderBy, orderDirection, single]);

  return { data, loading, error, refetch: fetchData };
} 