import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const submitServiceInquiry = async (req: Request, res: Response) => {
  try {
    const { serviceType, name, email, phone, companyName, requirements } = req.body;

    // Store service inquiry
    const { data: inquiry, error } = await supabase
      .from('service_inquiries')
      .insert([
        {
          service_type: serviceType,
          name,
          email,
          phone,
          company_name: companyName,
          requirements,
          status: 'new',
          ip_address: req.ip,
          user_agent: req.get('User-Agent')
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Service inquiry submission error:', error);
      return res.status(500).json({ error: 'Failed to submit service inquiry' });
    }

    res.status(201).json({
      message: 'Service inquiry submitted successfully',
      inquiryId: inquiry.id
    });
  } catch (error) {
    console.error('Service inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServiceInquiries = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const serviceType = req.query.serviceType as string;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('service_inquiries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (serviceType) {
      query = query.eq('service_type', serviceType);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: inquiries, error, count } = await query;

    if (error) {
      console.error('Get service inquiries error:', error);
      return res.status(500).json({ error: 'Failed to fetch service inquiries' });
    }

    res.json({
      inquiries,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Get service inquiries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateServiceInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const { data: inquiry, error } = await supabase
      .from('service_inquiries')
      .update({
        status,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update service inquiry error:', error);
      return res.status(500).json({ error: 'Failed to update service inquiry' });
    }

    res.json({
      message: 'Service inquiry updated successfully',
      inquiry
    });
  } catch (error) {
    console.error('Update service inquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = [
      {
        id: 'gst',
        name: 'GST Services',
        description: 'Complete GST registration, filing, and compliance services',
        features: ['GST Registration', 'Monthly Returns', 'Annual Returns', 'GST Audit']
      },
      {
        id: 'income-tax',
        name: 'Income Tax Services',
        description: 'Professional income tax filing and planning services',
        features: ['ITR Filing', 'Tax Planning', 'TDS Returns', 'Tax Audit']
      },
      {
        id: 'business-incorporation',
        name: 'Business Incorporation',
        description: 'Complete business setup and incorporation services',
        features: ['Company Registration', 'Partnership Firm', 'LLP Registration', 'Sole Proprietorship']
      },
      {
        id: 'trademark',
        name: 'Trademark Services',
        description: 'Trademark registration and intellectual property protection',
        features: ['Trademark Search', 'Registration', 'Renewal', 'Opposition']
      },
      {
        id: 'compliance',
        name: 'Compliance Services',
        description: 'Ongoing compliance and regulatory services',
        features: ['ROC Compliance', 'Labor Law', 'Environmental', 'FEMA']
      },
      {
        id: 'mca',
        name: 'MCA Services',
        description: 'Ministry of Corporate Affairs related services',
        features: ['Annual Filing', 'Board Resolutions', 'Share Transfer', 'Name Change']
      }
    ];

    res.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};