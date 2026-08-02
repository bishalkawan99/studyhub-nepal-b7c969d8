export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          category: string | null
          content: string | null
          cover_url: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          href: string
          id: string
          label: string
          user_id: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: string
          label: string
          user_id: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: string
          label?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      gpa_classes: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      gpa_faculties: {
        Row: {
          class_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gpa_faculties_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "gpa_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      gpa_grade_boundaries: {
        Row: {
          created_at: string
          grade: string
          grade_point: number
          id: string
          max_gpa: number
          min_gpa: number
          min_percentage: number | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          grade: string
          grade_point: number
          id?: string
          max_gpa: number
          min_gpa: number
          min_percentage?: number | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          grade?: string
          grade_point?: number
          id?: string
          max_gpa?: number
          min_gpa?: number
          min_percentage?: number | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      gpa_settings: {
        Row: {
          created_at: string
          key: string
          label: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          key: string
          label: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          key?: string
          label?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      gpa_subjects: {
        Row: {
          created_at: string
          faculty_id: string
          id: string
          is_active: boolean
          is_optional: boolean
          name: string
          practical_full_marks: number
          practical_label: string
          sort_order: number
          theory_full_marks: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          faculty_id: string
          id?: string
          is_active?: boolean
          is_optional?: boolean
          name: string
          practical_full_marks?: number
          practical_label?: string
          sort_order?: number
          theory_full_marks?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          faculty_id?: string
          id?: string
          is_active?: boolean
          is_optional?: boolean
          name?: string
          practical_full_marks?: number
          practical_label?: string
          sort_order?: number
          theory_full_marks?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gpa_subjects_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "gpa_faculties"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          chapter: string | null
          class_level: string
          created_at: string
          created_by: string | null
          description: string | null
          download_count: number
          file_path: string | null
          file_size: number | null
          id: string
          is_published: boolean
          resource_type: string
          subject_slug: string
          title: string
          updated_at: string
          view_count: number
          year: string | null
        }
        Insert: {
          chapter?: string | null
          class_level: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          download_count?: number
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_published?: boolean
          resource_type: string
          subject_slug: string
          title: string
          updated_at?: string
          view_count?: number
          year?: string | null
        }
        Update: {
          chapter?: string | null
          class_level?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          download_count?: number
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_published?: boolean
          resource_type?: string
          subject_slug?: string
          title?: string
          updated_at?: string
          view_count?: number
          year?: string | null
        }
        Relationships: []
      }
      mcq_questions: {
        Row: {
          chapter: string | null
          class_level: string
          correct_index: number
          created_at: string
          created_by: string | null
          explanation: string | null
          id: string
          is_published: boolean
          options: Json
          question: string
          subject_slug: string
          updated_at: string
        }
        Insert: {
          chapter?: string | null
          class_level: string
          correct_index: number
          created_at?: string
          created_by?: string | null
          explanation?: string | null
          id?: string
          is_published?: boolean
          options: Json
          question: string
          subject_slug: string
          updated_at?: string
        }
        Update: {
          chapter?: string | null
          class_level?: string
          correct_index?: number
          created_at?: string
          created_by?: string | null
          explanation?: string | null
          id?: string
          is_published?: boolean
          options?: Json
          question?: string
          subject_slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          path: string
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          class_level: string | null
          created_at: string
          full_name: string | null
          id: string
          school: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          class_level?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          school?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          class_level?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          school?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          class_level: string | null
          created_at: string
          id: string
          score: number
          seconds_taken: number | null
          subject_slug: string | null
          total: number
          user_id: string
        }
        Insert: {
          class_level?: string | null
          created_at?: string
          id?: string
          score: number
          seconds_taken?: number | null
          subject_slug?: string | null
          total: number
          user_id: string
        }
        Update: {
          class_level?: string | null
          created_at?: string
          id?: string
          score?: number
          seconds_taken?: number | null
          subject_slug?: string | null
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student"
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
      app_role: ["admin", "student"],
    },
  },
} as const
