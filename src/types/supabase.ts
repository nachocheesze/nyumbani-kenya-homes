export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_properties: {
        Row: {
          agent_id: string
          assigned_at: string | null
          commission_rate: number | null
          created_at: string | null
          id: string
          property_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          assigned_at?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          property_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          assigned_at?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          property_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      caretaker_assignments: {
        Row: {
          assigned_at: string | null
          caretaker_id: string | null
          created_at: string | null
          id: string
          property_id: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          caretaker_id?: string | null
          created_at?: string | null
          id?: string
          property_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          caretaker_id?: string | null
          created_at?: string | null
          id?: string
          property_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "caretaker_assignments_caretaker_id_fkey"
            columns: ["caretaker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      developer_projects: {
        Row: {
          actual_completion: string | null
          budget: number | null
          created_at: string | null
          description: string | null
          developer_id: string
          expected_completion: string | null
          id: string
          location: string
          name: string
          project_type: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          actual_completion?: string | null
          budget?: number | null
          created_at?: string | null
          description?: string | null
          developer_id: string
          expected_completion?: string | null
          id?: string
          location: string
          name: string
          project_type?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_completion?: string | null
          budget?: number | null
          created_at?: string | null
          description?: string | null
          developer_id?: string
          expected_completion?: string | null
          id?: string
          location?: string
          name?: string
          project_type?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "developer_projects_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          alternate_email: string | null
          created_at: string | null
          id: string
          name: string
          phone: string
          relationship: string
          tenant_user_id: string
          updated_at: string | null
        }
        Insert: {
          alternate_email?: string | null
          created_at?: string | null
          id?: string
          name: string
          phone: string
          relationship: string
          tenant_user_id: string
          updated_at?: string | null
        }
        Update: {
          alternate_email?: string | null
          created_at?: string | null
          id?: string
          name?: string
          phone?: string
          relationship?: string
          tenant_user_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_tenant_user_id_fkey"
            columns: ["tenant_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_projects: {
        Row: {
          created_at: string | null
          expected_return_rate: number | null
          id: string
          investment_amount: number
          investment_date: string | null
          investor_id: string
          ownership_percentage: number | null
          project_id: string | null
          property_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expected_return_rate?: number | null
          id?: string
          investment_amount: number
          investment_date?: string | null
          investor_id: string
          ownership_percentage?: number | null
          project_id?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expected_return_rate?: number | null
          id?: string
          investment_amount?: number
          investment_date?: string | null
          investor_id?: string
          ownership_percentage?: number | null
          project_id?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investor_projects_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "developer_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_projects_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          landlord_id: string | null
          priority: string | null
          property_id: string | null
          status: string | null
          tenant_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          landlord_id?: string | null
          priority?: string | null
          property_id?: string | null
          status?: string | null
          tenant_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          landlord_id?: string | null
          priority?: string | null
          property_id?: string | null
          status?: string | null
          tenant_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          property_id: string | null
          recipient_id: string | null
          sender_id: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          property_id?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          property_id?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          agent_id: string | null
          amenities: string[] | null
          available_from: string | null
          bathrooms: number | null
          bedrooms: number | null
          category: Database["public"]["Enums"]["property_category"] | null
          city: string
          common_amenities: string | null
          construction_permit_url: string | null
          county: string
          created_at: string | null
          deposit_amount: number | null
          description: string | null
          features: string[] | null
          floor_plan_url: string | null
          has_unit_variations: boolean | null
          id: string
          images: string[] | null
          is_available: boolean | null
          is_furnished: boolean | null
          landlord_id: string | null
          lease_template_url: string | null
          main_image_url: string | null
          nearby_landmarks: string | null
          nema_certificate_url: string | null
          number_of_blocks: number | null
          ownership_type:
            | Database["public"]["Enums"]["property_ownership_type"]
            | null
          pets_allowed: boolean | null
          property_name: string
          property_structure:
            | Database["public"]["Enums"]["property_structure"]
            | null
          property_type: string
          rent_amount: number | null
          shared_amenities: string[] | null
          shared_utilities: string | null
          title_deed_file_url: string | null
          total_units: number | null
          updated_at: string | null
          utilities_included: string[] | null
          video_url: string | null
          virtual_tour_url: string | null
        }
        Insert: {
          address: string
          agent_id?: string | null
          amenities?: string[] | null
          available_from?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          category?: Database["public"]["Enums"]["property_category"] | null
          city: string
          common_amenities?: string | null
          construction_permit_url?: string | null
          county: string
          created_at?: string | null
          deposit_amount?: number | null
          description?: string | null
          features?: string[] | null
          floor_plan_url?: string | null
          has_unit_variations?: boolean | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          is_furnished?: boolean | null
          landlord_id?: string | null
          lease_template_url?: string | null
          main_image_url?: string | null
          nearby_landmarks?: string | null
          nema_certificate_url?: string | null
          number_of_blocks?: number | null
          ownership_type?:
            | Database["public"]["Enums"]["property_ownership_type"]
            | null
          pets_allowed?: boolean | null
          property_name: string
          property_structure?:
            | Database["public"]["Enums"]["property_structure"]
            | null
          property_type: string
          rent_amount?: number | null
          shared_amenities?: string[] | null
          shared_utilities?: string | null
          title_deed_file_url?: string | null
          total_units?: number | null
          updated_at?: string | null
          utilities_included?: string[] | null
          video_url?: string | null
          virtual_tour_url?: string | null
        }
        Update: {
          address?: string
          agent_id?: string | null
          amenities?: string[] | null
          available_from?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          category?: Database["public"]["Enums"]["property_category"] | null
          city?: string
          common_amenities?: string | null
          construction_permit_url?: string | null
          county?: string
          created_at?: string | null
          deposit_amount?: number | null
          description?: string | null
          features?: string[] | null
          floor_plan_url?: string | null
          has_unit_variations?: boolean | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          is_furnished?: boolean | null
          landlord_id?: string | null
          lease_template_url?: string | null
          main_image_url?: string | null
          nearby_landmarks?: string | null
          nema_certificate_url?: string | null
          number_of_blocks?: number | null
          ownership_type?:
            | Database["public"]["Enums"]["property_ownership_type"]
            | null
          pets_allowed?: boolean | null
          property_name?: string
          property_structure?:
            | Database["public"]["Enums"]["property_structure"]
            | null
          property_type?: string
          rent_amount?: number | null
          shared_amenities?: string[] | null
          shared_utilities?: string | null
          title_deed_file_url?: string | null
          total_units?: number | null
          updated_at?: string | null
          utilities_included?: string[] | null
          video_url?: string | null
          virtual_tour_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      property_documents: {
        Row: {
          description: string | null
          document_type: Database["public"]["Enums"]["property_document_type"]
          file_url: string
          id: string
          is_public: boolean | null
          property_id: string
          uploaded_at: string | null
          uploaded_by: string | null
          user_id: string | null
        }
        Insert: {
          description?: string | null
          document_type: Database["public"]["Enums"]["property_document_type"]
          file_url: string
          id?: string
          is_public?: boolean | null
          property_id: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          user_id?: string | null
        }
        Update: {
          description?: string | null
          document_type?: Database["public"]["Enums"]["property_document_type"]
          file_url?: string
          id?: string
          is_public?: boolean | null
          property_id?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_documents_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_media: {
        Row: {
          description: string | null
          id: string
          is_primary: boolean | null
          media_type: Database["public"]["Enums"]["property_media_type"]
          property_id: string
          uploaded_at: string | null
          url: string
        }
        Insert: {
          description?: string | null
          id?: string
          is_primary?: boolean | null
          media_type: Database["public"]["Enums"]["property_media_type"]
          property_id: string
          uploaded_at?: string | null
          url: string
        }
        Update: {
          description?: string | null
          id?: string
          is_primary?: boolean | null
          media_type?: Database["public"]["Enums"]["property_media_type"]
          property_id?: string
          uploaded_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_media_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_units: {
        Row: {
          amenities: string[] | null
          bathrooms: number | null
          bedrooms: number | null
          deposit_amount: number | null
          features: string[] | null
          id: string
          is_occupied: boolean | null
          notes: string | null
          property_id: string
          rent_amount: number | null
          size_sqm: number | null
          status: string | null
          tenant_id: string | null
          unit_number: string
        }
        Insert: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          deposit_amount?: number | null
          features?: string[] | null
          id?: string
          is_occupied?: boolean | null
          notes?: string | null
          property_id: string
          rent_amount?: number | null
          size_sqm?: number | null
          status?: string | null
          tenant_id?: string | null
          unit_number: string
        }
        Update: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          deposit_amount?: number | null
          features?: string[] | null
          id?: string
          is_occupied?: boolean | null
          notes?: string | null
          property_id?: string
          rent_amount?: number | null
          size_sqm?: number | null
          status?: string | null
          tenant_id?: string | null
          unit_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      real_estate_company_agents: {
        Row: {
          agent_id: string
          commission_split: number | null
          company_id: string
          created_at: string | null
          hire_date: string | null
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          commission_split?: number | null
          company_id: string
          created_at?: string | null
          hire_date?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          commission_split?: number | null
          company_id?: string
          created_at?: string | null
          hire_date?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "real_estate_company_agents_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "real_estate_company_agents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rent_payments: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          id: string
          landlord_id: string | null
          payment_date: string
          payment_method: string | null
          property_id: string | null
          status: string | null
          tenant_id: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          landlord_id?: string | null
          payment_date: string
          payment_method?: string | null
          property_id?: string | null
          status?: string | null
          tenant_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          landlord_id?: string | null
          payment_date?: string
          payment_method?: string | null
          property_id?: string | null
          status?: string | null
          tenant_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rent_payments_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rent_payments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rent_payments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      service_provider_orders: {
        Row: {
          client_id: string
          completion_date: string | null
          cost: number | null
          created_at: string | null
          description: string
          id: string
          notes: string | null
          priority: string | null
          property_id: string | null
          scheduled_date: string | null
          service_provider_id: string
          service_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          completion_date?: string | null
          cost?: number | null
          created_at?: string | null
          description: string
          id?: string
          notes?: string | null
          priority?: string | null
          property_id?: string | null
          scheduled_date?: string | null
          service_provider_id: string
          service_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          completion_date?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string
          id?: string
          notes?: string | null
          priority?: string | null
          property_id?: string | null
          scheduled_date?: string | null
          service_provider_id?: string
          service_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_provider_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_provider_orders_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_provider_orders_service_provider_id_fkey"
            columns: ["service_provider_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      short_term_bookings: {
        Row: {
          booking_fee: number | null
          check_in_date: string
          check_out_date: string
          cleaning_fee: number | null
          created_at: string | null
          guest_email: string
          guest_name: string
          guest_phone: string | null
          host_id: string
          id: string
          payment_status: string | null
          property_id: string
          special_requests: string | null
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          booking_fee?: number | null
          check_in_date: string
          check_out_date: string
          cleaning_fee?: number | null
          created_at?: string | null
          guest_email: string
          guest_name: string
          guest_phone?: string | null
          host_id: string
          id?: string
          payment_status?: string | null
          property_id: string
          special_requests?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          booking_fee?: number | null
          check_in_date?: string
          check_out_date?: string
          cleaning_fee?: number | null
          created_at?: string | null
          guest_email?: string
          guest_name?: string
          guest_phone?: string | null
          host_id?: string
          id?: string
          payment_status?: string | null
          property_id?: string
          special_requests?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "short_term_bookings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "short_term_bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_documents: {
        Row: {
          created_at: string | null
          document_type: string
          file_url: string
          id: string
          tenant_user_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          document_type: string
          file_url: string
          id?: string
          tenant_user_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          document_type?: string
          file_url?: string
          id?: string
          tenant_user_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_documents_tenant_user_id_fkey"
            columns: ["tenant_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_verifications: {
        Row: {
          created_at: string | null
          id: string
          id_back_url: string | null
          id_front_url: string
          id_number: string
          id_type: string
          kra_pin: string | null
          nhif_number: string | null
          selfie_with_id_url: string | null
          tenant_user_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          id_back_url?: string | null
          id_front_url: string
          id_number: string
          id_type: string
          kra_pin?: string | null
          nhif_number?: string | null
          selfie_with_id_url?: string | null
          tenant_user_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          id_back_url?: string | null
          id_front_url?: string
          id_number?: string
          id_type?: string
          kra_pin?: string | null
          nhif_number?: string | null
          selfie_with_id_url?: string | null
          tenant_user_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_verifications_tenant_user_id_fkey"
            columns: ["tenant_user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          deposit_paid: number | null
          id: string
          landlord_id: string | null
          lease_agreement_url: string | null
          lease_end_date: string | null
          move_in_date: string | null
          payment_cycle: string | null
          payment_method: string | null
          property_id: string | null
          rent_amount: number
          rent_due_day: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deposit_paid?: number | null
          id?: string
          landlord_id?: string | null
          lease_agreement_url?: string | null
          lease_end_date?: string | null
          move_in_date?: string | null
          payment_cycle?: string | null
          payment_method?: string | null
          property_id?: string | null
          rent_amount: number
          rent_due_day?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deposit_paid?: number | null
          id?: string
          landlord_id?: string | null
          lease_agreement_url?: string | null
          lease_end_date?: string | null
          move_in_date?: string | null
          payment_cycle?: string | null
          payment_method?: string | null
          property_id?: string | null
          rent_amount?: number
          rent_due_day?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenants_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          created_at: string | null
          deposit_amount: number | null
          id: string
          is_available: boolean | null
          property_id: string
          rent_amount: number | null
          unit_name: string
        }
        Insert: {
          created_at?: string | null
          deposit_amount?: number | null
          id?: string
          is_available?: boolean | null
          property_id: string
          rent_amount?: number | null
          unit_name: string
        }
        Update: {
          created_at?: string | null
          deposit_amount?: number | null
          id?: string
          is_available?: boolean | null
          property_id?: string
          rent_amount?: number | null
          unit_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          full_name: string
          gender: string | null
          id: string
          marital_status: string | null
          monthly_income_range: string | null
          nationality: string | null
          occupation: string | null
          phone_number: string | null
          profile_photo_url: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          full_name: string
          gender?: string | null
          id: string
          marital_status?: string | null
          monthly_income_range?: string | null
          nationality?: string | null
          occupation?: string | null
          phone_number?: string | null
          profile_photo_url?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          marital_status?: string | null
          monthly_income_range?: string | null
          nationality?: string | null
          occupation?: string | null
          phone_number?: string | null
          profile_photo_url?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      property_category: "rent" | "sale" | "short_term"
      property_document_type:
        | "title_deed"
        | "lease_template"
        | "nema_certificate"
        | "construction_permit"
        | "insurance"
        | "tax_document"
        | "valuation_report"
        | "other"
      property_media_type:
        | "image"
        | "video"
        | "floor_plan"
        | "virtual_tour"
        | "other"
      property_ownership_type: "freehold" | "leasehold" | "rental_only"
      property_structure: "single_unit" | "multi_unit_block" | "estate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      property_category: ["rent", "sale", "short_term"],
      property_document_type: [
        "title_deed",
        "lease_template",
        "nema_certificate",
        "construction_permit",
        "insurance",
        "tax_document",
        "valuation_report",
        "other",
      ],
      property_media_type: [
        "image",
        "video",
        "floor_plan",
        "virtual_tour",
        "other",
      ],
      property_ownership_type: ["freehold", "leasehold", "rental_only"],
      property_structure: ["single_unit", "multi_unit_block", "estate"],
    },
  },
} as const
