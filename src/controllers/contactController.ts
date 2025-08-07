import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Store contact form submission
    const { data: contact, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone,
          subject,
          message,
          status: 'new',
          ip_address: req.ip,
          user_agent: req.get('User-Agent')
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Contact form submission error:', error);
      return res.status(500).json({ error: 'Failed to submit contact form' });
    }

    // Here you could add email notification logic
    // await sendNotificationEmail(contact);

    res.status(201).json({
      message: 'Contact form submitted successfully',
      submissionId: contact.id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getContactSubmissions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('contact_submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: submissions, error, count } = await query;

    if (error) {
      console.error('Get contact submissions error:', error);
      return res.status(500).json({ error: 'Failed to fetch contact submissions' });
    }

    res.json({
      submissions,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Get contact submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateContactSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .update({
        status,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update contact submission error:', error);
      return res.status(500).json({ error: 'Failed to update contact submission' });
    }

    res.json({
      message: 'Contact submission updated successfully',
      submission
    });
  } catch (error) {
    console.error('Update contact submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};